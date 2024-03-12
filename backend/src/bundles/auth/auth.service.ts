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

class AuthService implements TAuthService {
    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
    }

    public async signUp(
        userRequestDto: UserSignUpRequestDto,
    ): ReturnType<TAuthService['signUp']> {
        const { email, password } = userRequestDto;
        const foundUserByEmail = await this.userService.findByEmail({
            email,
            withDeleted: true,
        });
        if (foundUserByEmail?.deletedAt) {
            throw new HTTPError({
                message: ExceptionMessage.EMAIL_TAKEN,
                status: HttpCode.BAD_REQUEST,
            });
        }
        if (foundUserByEmail) {
            throw new HTTPError({
                message: ExceptionMessage.EMAIL_TAKEN,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const passwordSalt = await this.generateSalt();

        const passwordHash = await this.encrypt(String(password), passwordSalt);

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
}

export { AuthService };
