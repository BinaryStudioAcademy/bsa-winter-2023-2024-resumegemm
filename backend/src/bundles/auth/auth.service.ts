import { ExceptionMessage, HttpCode, HttpError } from 'shared/build/index.js';

import {
    comparePasswords,
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

class AuthService {
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
        const { id } = await this.userService.create(userRequestDto);

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
        const { passwordHash, id } = foundUserByEmail;
        const isEqualPassword = await comparePasswords(password, passwordHash);

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

    public verifyToken<T>(token: string, isRefreshToken?: boolean): T {
        try {
            return verifyToken(token, isRefreshToken) as T;
        } catch {
            throw new HttpError({
                message: ExceptionMessage.AUTH_FAILED,
                status: HttpCode.UNAUTHORIZED,
            });
        }
    }
}

export { AuthService };
