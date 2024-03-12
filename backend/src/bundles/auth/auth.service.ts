import { genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    type AuthService as TAuthService,
    type EncryptionDataPayload,
    AuthException,
    ExceptionMessage,
    HttpCode,
    HTTPError,
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
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { type IConfig } from '~/common/config/config.js';
import { type ApiHandlerResponse } from '~/common/controller/controller.js';
import { mailService } from '~/common/mail-service/mail-service.js';

import { EmailConfirmMessages } from './enums/message.enum.js';
import { generateEmailConfirmToken } from './helpers/token/email-confirm-token/email-confirm-token.js';

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
        const foundUserByEmail = await this.userService.findByEmail(
            userRequestDto.email,
        );

        if (foundUserByEmail) {
            throw new HTTPError({
                message: ExceptionMessage.EMAIL_TAKEN,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const passwordSalt = await this.generateSalt();

        const passwordHash = await this.encrypt(
            String(userRequestDto.password),
            passwordSalt,
        );

        const { id, email } = await this.userService.create({
            ...userRequestDto,
            passwordSalt,
            passwordHash,
        });

        const token = generateToken({ id });
        const emailConfirmToken = generateEmailConfirmToken({ email });

        await this.sendAfterSignUpEmail(email, emailConfirmToken);

        const user = await this.getUserWithProfile(id);

        return {
            user,
            token,
        };
    }

    private async sendAfterSignUpEmail(
        email: string,
        emailConfirmToken: string,
    ): Promise<void> {
        const verificationLink = `${this.config.ENV.APP.ORIGIN_URL}/confirm-email?token=${emailConfirmToken}`;
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
        const foundUserByEmail = await this.userService.findByEmail(email);

        if (!foundUserByEmail) {
            throw new HTTPError({
                message: ExceptionMessage.USER_NOT_FOUND,
                status: HttpCode.BAD_REQUEST,
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
            throw new HTTPError({
                message: ExceptionMessage.INVALID_PASSWORD,
                status: HttpCode.UNAUTHORIZED,
            });
        }
        if (!emailConfirmed) {
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
        const { EMAIL_CONFIRM_TOKEN_SECRET } = this.config.ENV.JWT;
        const tokenPayload = this.verifyToken<{ email: string }>(
            emailConfirmToken,
            EMAIL_CONFIRM_TOKEN_SECRET,
        );
        const email = tokenPayload.email;
        const user = await this.userService.findByEmail(email);

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
    }
}

export { AuthService };
