import { genSalt, hash } from 'bcrypt';
import {
    type AuthService as TAuthService,
    type EncryptionDataPayload,
    type UserForgotPasswordRequestDto,
    type UserResetPasswordRequestDto,
    type UserVerifyResetPasswordTokenRequestDto,
} from 'shared/build/index.js';
import {
    AuthException,
    ExceptionMessage,
    HttpCode,
    HTTPError,
} from 'shared/build/index.js';

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
import { config } from '~/common/config/config.js';

import { generateResetPasswordToken } from './helpers/token/token.js';

class AuthService implements TAuthService {
    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
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

        const { id } = await this.userService.create({
            ...userRequestDto,
            passwordSalt,
            passwordHash,
        });

        const user = await this.getUserWithProfile(id);
        const token = generateToken({ id });

        return {
            user,
            token,
        };
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
        const { passwordHash, passwordSalt, id } = foundUserByEmail;
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
        } catch {
            throw new AuthException();
        }
    }

    public verifyResetPasswordToken<T>(resetPasswordToken: string): T {
        try {
            const resetPasswordTokenSecret = config.ENV.JWT.RESET_TOKEN_SECRET;

            return verifyToken(
                resetPasswordToken,
                resetPasswordTokenSecret,
            ) as T;
        } catch {
            throw new HTTPError({
                message: ExceptionMessage.INVALID_RESET_TOKEN,
                status: HttpCode.BAD_REQUEST,
            });
        }
    }

    public async tokenEqualsEmail({
        email,
        resetPasswordToken,
    }: UserVerifyResetPasswordTokenRequestDto): ReturnType<
        TAuthService['tokenEqualsEmail']
    > {
        const user = await this.userService.findByEmail(email);

        const tokenPayload = this.verifyResetPasswordToken<{ email: string }>(
            resetPasswordToken,
        );

        if (user?.email !== tokenPayload.email) {
            throw new HTTPError({
                message: ExceptionMessage.INVALID_RESET_TOKEN,
                status: HttpCode.BAD_REQUEST,
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

        const userWithProfile = await this.userService.getUserWithProfile(
            user.id,
        );

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
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new HTTPError({
                status: HttpCode.BAD_REQUEST,
                message: ExceptionMessage.USER_NOT_FOUND,
            });
        }

        return generateResetPasswordToken({ email });
    }
}

export { AuthService };
