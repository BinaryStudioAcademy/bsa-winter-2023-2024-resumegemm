import { type UserAuthResponse } from './user-auth-response.type';

type UserSignInResponseDto = {
    user: UserAuthResponse;
    accessToken: string;
};

export { type UserSignInResponseDto };
