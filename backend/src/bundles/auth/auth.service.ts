import { genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    type AuthService as TAuthService,
    type EncryptionDataPayload,
    type UserForgotPasswordRequestDto,
    type UserResetPasswordRequestDto,
    type UserVerifyResetPasswordTokenRequestDto,
    AuthException,
    ExceptionMessage,
    HttpCode,
    HTTPError,
    ServerErrorType,
} from 'shared/build/index.js';

import { getTemplate } from '~/bundles/auth/helpers/get-template.js';
import {
    generateRefreshToken,
    generateToken,
    verifyToken,
} from '~/bundles/auth/helpers/helpers.js';
import {
    type UserConfirmEmailRequestDto,
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { type IConfig, config } from '~/common/config/config.js';
import { mailService } from '~/common/mail-service/mail-service.js';

import { EmailConfirmMessages } from './enums/message.enum.js';
import { generateEmailConfirmToken } from './helpers/token/email-confirm-token/email-confirm-token.js';
import { generateResetPasswordToken } from './helpers/token/token.js';

type ConstructorType = {
    userService: UserService;
    config: IConfig;
};

class AuthService implements TAuthService {
    private userService: UserService;
    private config: IConfig;

    public constructor({ userService, config }: ConstructorType) {
        this.userService = userService;
        this.config = config;
    }

    public async signUp(
        userRequestDto: UserSignUpRequestDto,
    ): ReturnType<TAuthService['signUp']> {
        const { email, password } = userRequestDto;
        const foundUserByEmail = await this.userService.findByEmail({
            email,
            withDeleted: true,
        });

        if (foundUserByEmail?.emailConfirmed || foundUserByEmail?.deletedAt) {
            throw new AuthException({
                message: ExceptionMessage.EMAIL_TAKEN,
                status: HttpCode.BAD_REQUEST,
                errorType: ServerErrorType.EMAIL,
            });
        }

        if (foundUserByEmail && !foundUserByEmail.emailConfirmed) {
            return await this.getUserAfterSendEmail(email, foundUserByEmail.id);
        }

        const passwordSalt = await this.generateSalt();
        const passwordHash = await this.encrypt(String(password), passwordSalt);

        const { id } = await this.userService.create({
            ...userRequestDto,
            passwordSalt,
            passwordHash,
        });

        return await this.getUserAfterSendEmail(email, id);
    }

    private async getUserAfterSendEmail(
        email: string,
        id: string,
    ): Promise<UserSignUpResponseDto> {
        const emailConfirmToken = generateEmailConfirmToken({ email });
        await this.sendAfterSignUpEmail(email, emailConfirmToken);

        const user = await this.getUserWithProfile(id);
        const token = generateToken({ id });

        return {
            user,
            token,
        };
    }

    private async sendAfterSignUpEmail(
        email: string,
        emailConfirmToken: string,
    ): Promise<void> {
        const verificationLink = `${this.config.ENV.APP.ORIGIN_URL}/email-confirmation?token=${emailConfirmToken}`;
        const emailMockup = getTemplate({
            name: 'sign-up-email-template',
            context: {
                title: 'ResumeGemm',
                dashboardLink: verificationLink,
                logoLink: this.config.ENV.EMAIL.SMTP_LOGO,
            },
        });

        await mailService.sendMail({
            to: email,
            subject: EmailConfirmMessages.SUCCESSFULLY_REGISTERED,
            text: EmailConfirmMessages.SUCCESSFULLY_REGISTERED,
            html: emailMockup,
        });
    }

    public async login({
        email,
        password,
    }: UserSignInRequestDto): ReturnType<TAuthService['login']> {
        const foundUserByEmail = await this.userService.findByEmail({
            email,
            withDeleted: true,
        });

        if (foundUserByEmail?.deletedAt) {
            throw new HTTPError({
                message: ExceptionMessage.NO_ACTIVE_ACCOUNT,
                status: HttpCode.BAD_REQUEST,
            });
        }

        if (!foundUserByEmail) {
            throw new AuthException({
                message: ExceptionMessage.USER_NOT_FOUND,
                status: HttpCode.NOT_FOUND,
                errorType: ServerErrorType.EMAIL,
            });
        }

        const { passwordHash, passwordSalt, id, emailConfirmed } =
            foundUserByEmail;
        const isEqualPassword = await this.compare({
            plaintTextPassword: password,
            passwordSalt,
            passwordHash,
        });

        if (!isEqualPassword) {
            throw new AuthException({
                message: ExceptionMessage.INVALID_PASSWORD,
                status: HttpCode.UNAUTHORIZED,
                errorType: ServerErrorType.PASSWORD,
            });
        }
        if (!emailConfirmed) {
            const emailConfirmToken = generateEmailConfirmToken({ email });
            await this.sendAfterSignUpEmail(email, emailConfirmToken);

            throw new HTTPError({
                message: ExceptionMessage.EMAIL_CONFIRM,
                status: HttpCode.UNAUTHORIZED,
            });
        }

        const user = await this.getUserWithProfile(id);
        return {
            user,
            accessToken: generateToken({ id }),
            refreshToken: generateRefreshToken({ id }),
        };
    }

    public async getUserWithProfile(
        id: string,
    ): ReturnType<TAuthService['getUserWithProfile']> {
        return await this.userService.getUserWithProfileAndOauthConnections(id);
    }

    public encrypt(data: string, salt: string): Promise<string> {
        return hash(data, salt);
    }

    public async compare({
        plaintTextPassword,
        passwordSalt,
        passwordHash,
    }: EncryptionDataPayload): Promise<boolean> {
        if (!passwordSalt) {
            return false;
        }
        const dataHash = await this.encrypt(plaintTextPassword, passwordSalt);
        return dataHash === passwordHash;
    }

    public async generateSalt(): Promise<string> {
        const USER_PASSWORD_SALT_ROUNDS = 10;
        return await genSalt(USER_PASSWORD_SALT_ROUNDS);
    }

    public verifyToken<T>(token: string, tokenSecret: string): T {
        try {
            return verifyToken(token, tokenSecret) as T;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new HTTPError({
                    message: ExceptionMessage.TOKEN_EXPIRED,
                    status: HttpCode.EXPIRED_TOKEN,
                });
            }
            throw new AuthException();
        }
    }

    public async confirmUserEmail({
        emailConfirmToken,
    }: UserConfirmEmailRequestDto): ReturnType<
        TAuthService['confirmUserEmail']
    > {
        try {
            const { EMAIL_CONFIRM_TOKEN_SECRET } = this.config.ENV.JWT;
            const tokenPayload = this.verifyToken<{ email: string }>(
                emailConfirmToken,
                EMAIL_CONFIRM_TOKEN_SECRET,
            );
            const email = tokenPayload.email;
            const user = await this.userService.findByEmail({ email });

            if (user?.email !== email) {
                throw new HTTPError({
                    message: ExceptionMessage.INVALID_EMAIL_CONFIRM_TOKEN,
                    status: HttpCode.BAD_REQUEST,
                });
            }
            await this.userService.confirmEmail(user.id);
            const userWithProfile = await this.getUserWithProfile(user.id);

            return {
                user: userWithProfile,
                accessToken: generateToken({ id: user.id }),
                refreshToken: generateRefreshToken({ id: user.id }),
            };
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new HTTPError({
                    message: ExceptionMessage.TOKEN_EXPIRED,
                    status: HttpCode.EXPIRED_TOKEN,
                });
            }
            throw new AuthException();
        }
    }

    public async tokenEqualsEmail({
        email,
        resetPasswordToken,
    }: UserVerifyResetPasswordTokenRequestDto): ReturnType<
        TAuthService['tokenEqualsEmail']
    > {
        const user = await this.userService.findByEmail({ email });

        const resetPasswordTokenSecret = config.ENV.JWT.RESET_TOKEN_SECRET;

        const tokenPayload = this.verifyToken<{ email: string }>(
            resetPasswordToken,
            resetPasswordTokenSecret,
        );

        if (user?.email !== tokenPayload.email) {
            throw new HTTPError({
                message: ExceptionMessage.INVALID_RESET_TOKEN,
                status: HttpCode.NOT_FOUND,
            });
        }

        return user;
    }

    public async resetPassword({
        email,
        resetPasswordToken,
        password,
    }: UserResetPasswordRequestDto): ReturnType<TAuthService['resetPassword']> {
        const user = await this.tokenEqualsEmail({
            resetPasswordToken,
            email,
        });

        const passwordSalt = await this.generateSalt();

        const passwordHash = await this.encrypt(password, passwordSalt);

        const userWithProfile = await this.getUserWithProfile(user.id);

        await this.userService.changePassword({
            id: user.id,
            passwordHash,
            passwordSalt,
        });

        return {
            user: userWithProfile,
            accessToken: generateToken({ id: user.id }),
            refreshToken: generateRefreshToken({ id: user.id }),
        };
    }

    public async createResetPasswordToken({
        email,
    }: UserForgotPasswordRequestDto): ReturnType<
        TAuthService['createResetPasswordToken']
    > {
        const user = await this.userService.findByEmail({ email });

        if (!user) {
            throw new HTTPError({
                status: HttpCode.NOT_FOUND,
                message: ExceptionMessage.USER_NOT_FOUND,
            });
        }

        return generateResetPasswordToken({ email });
    }
}

export { AuthService };
