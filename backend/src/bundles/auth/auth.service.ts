import { genSalt, hash } from 'bcrypt';
import {
    type AuthService as TAuthService,
    type EncryptionDataPayload,
    AuthException,
    ExceptionMessage,
    HttpCode,
    HttpError,
} from 'shared/build/index.js';

import { getTemplate } from '~/bundles/auth/helpers/get-template.js';
import {
    generateRefreshToken,
    generateToken,
    verifyToken,
} from '~/bundles/auth/helpers/helpers.js';
import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { type IConfig } from '~/common/config/config.js';
import { mailService } from '~/common/mail-service/mail-service.js';

import { userMessages } from './enums/message.enum.js';

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
            throw new HttpError({
                message: ExceptionMessage.EMAIL_TAKEN,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const passwordSalt = await this.generateSalt();

        const passwordHash = await this.encrypt(
            userRequestDto.password,
            passwordSalt,
        );

        const { id, email } = await this.userService.create({
            ...userRequestDto,
            passwordSalt,
            passwordHash,
        });
        const token = generateToken({ id });
        await this.sendAfterSignUpEmail(email, token);

        const user = await this.getUserWithProfile(id);

        return {
            user,
            token,
        };
    }

    private async sendAfterSignUpEmail(
        email: string,
        token: string,
    ): Promise<void> {
        const verificationLink = `${this.config.ENV.APP.ORIGIN_URL}/confirm-email?token=${token}`;
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
            subject: userMessages.SUCCESSFULLY_REGISTRED,
            text: userMessages.SUCCESSFULLY_REGISTRED,
            html: emailMockup,
        });
    }

    public async login({
        email,
        password,
    }: UserSignInRequestDto): ReturnType<TAuthService['login']> {
        const foundUserByEmail = await this.userService.findByEmail(email);

        if (!foundUserByEmail) {
            throw new HttpError({
                message: ExceptionMessage.USER_NOT_FOUND,
                status: HttpCode.BAD_REQUEST,
            });
        }
        const { passwordHash, passwordSalt, id } = foundUserByEmail;
        const isEqualPassword = await this.compare({
            plaintTextPassword: password,
            passwordSalt,
            passwordHash,
        });

        if (!isEqualPassword) {
            throw new HttpError({
                message: ExceptionMessage.INVALID_PASSWORD,
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
        return await this.userService.getUserWithProfile(id);
    }

    public encrypt(data: string, salt: string): Promise<string> {
        return hash(data, salt);
    }

    public async compare({
        plaintTextPassword,
        passwordSalt,
        passwordHash,
    }: EncryptionDataPayload): Promise<boolean> {
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
        } catch {
            throw new AuthException();
        }
    }
}

export { AuthService };
