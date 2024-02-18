import { genSalt, hash } from 'bcrypt';
import {
    type AuthService as TAuthService,
    type EncryptionDataPayload,
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
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';

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

    public verifyToken<T>(token: string): T {
        return verifyToken(token) as T;
    }
}

export { AuthService };
