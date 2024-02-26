import { type UserAuthResponse } from './user-auth-response.type';

type UserSignInResponseDto = {
    user: UserAuthResponse;
    accessToken: string;
    refreshToken: string;
};

export { type UserSignInResponseDto };
