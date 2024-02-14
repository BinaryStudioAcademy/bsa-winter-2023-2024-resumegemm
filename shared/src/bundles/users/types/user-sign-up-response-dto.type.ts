import { type UserAuthResponse } from './user-auth-response.type';

type UserSignUpResponseDto = {
    user: UserAuthResponse;
    accessToken: string;
    refreshToken: string;
};

export { type UserSignUpResponseDto };
