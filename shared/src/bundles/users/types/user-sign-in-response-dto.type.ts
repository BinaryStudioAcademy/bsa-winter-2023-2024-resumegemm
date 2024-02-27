import { type UserAuthResponse } from './user-auth-response.type';

type UserSignInResponseDto = UserAuthResponse & {
    accessToken: string;
    refreshToken: string;
};

export { type UserSignInResponseDto };
