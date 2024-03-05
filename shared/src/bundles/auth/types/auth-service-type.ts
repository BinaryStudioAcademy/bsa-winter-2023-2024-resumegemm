import {
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
    type UserWithProfileRelation,
} from '../../users/users.js';

type AuthService = {
    signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto>;

    login({
        email,
        password,
    }: UserSignInRequestDto): Promise<UserSignInResponseDto>;

    getUser(id: string): Promise<UserWithProfileRelation>;

    verifyToken<T>(token: string, isRefreshToken?: boolean): T;
};

export { type AuthService };
