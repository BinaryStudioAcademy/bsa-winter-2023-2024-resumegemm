import { ExceptionMessage, HttpCode, HttpError } from 'shared/build/index.js';

import {
    comparePasswords,
    generateToken,
} from '~/bundles/auth/helpers/helpers.js';
import { verifyToken } from '~/bundles/auth/helpers/token/token.js';
import {
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
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
            refreshToken: generateToken({ id }, true),
        };
    }

    public verifyToken<T>(token: string): T {
        return verifyToken(token) as T;
    }
}

export { AuthService };
