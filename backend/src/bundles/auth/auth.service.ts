import { genSalt, hash } from 'bcrypt';
import {
    type AuthService as TAuthService,
    type EncryptionDataPayload,
    type UserForgotPasswordRequestDto,
    type UserResetPasswordRequestDto,
} from 'shared/build/index.js';
import {
    AuthException,
    ExceptionMessage,
    HttpCode,
    HttpError,
} from 'shared/build/index.js';

import {
    generateRefreshToken,
    generateToken,
    verifyToken,
} from '~/bundles/auth/helpers/helpers.js';
import {
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
    type UserWithProfileRelation,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { config } from '~/common/config/config.js';

import { generateResetToken } from './helpers/token/token.js';

class AuthService implements TAuthService {
    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
    }

    public async signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
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

        const { id } = await this.userService.create(
            userRequestDto,
            passwordSalt,
            passwordHash,
        );

        const user = await this.userService.getUserWithProfile(id);

        return {
            user,
        };
    }

    public async login({
        email,
        password,
    }: UserSignInRequestDto): Promise<UserSignInResponseDto> {
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
        const user = await this.userService.getUserWithProfile(id);
        return {
            user,
            accessToken: generateToken({ id }),
            refreshToken: generateRefreshToken({ id }),
        };
    }

    public async getUser(id: string): Promise<UserWithProfileRelation> {
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

    public verifyResetToken<T>(token: string, tokenSecret: string): T {
        try {
            return verifyToken(token, tokenSecret) as T;
        } catch {
            throw new HttpError({
                message: ExceptionMessage.INVALID_RESET_TOKEN,
                status: HttpCode.BAD_REQUEST,
            });
        }
    }

    public async resetPassword({
        resetToken,
        password,
    }: UserResetPasswordRequestDto): Promise<void> {
        const resetTokenSecret = config.ENV.JWT.RESET_TOKEN_SECRET;

        const { id } = this.verifyResetToken<{ id: string }>(
            resetToken,
            resetTokenSecret,
        );

        const user = await this.userService.getUserWithProfile(id);

        if (!user) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: ExceptionMessage.INVALID_RESET_TOKEN,
            });
        }

        const passwordSalt = await this.generateSalt();

        const passwordHash = await this.encrypt(password, passwordSalt);

        await this.userService.changePassword({
            id,
            passwordHash,
        });
    }

    public async createResetToken({
        email,
    }: UserForgotPasswordRequestDto): Promise<string> {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: ExceptionMessage.USER_NOT_FOUND,
            });
        }

        return generateResetToken({ id: user.id });
    }
}

export { AuthService };
