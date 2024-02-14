import { type UserAuthResponse } from './user-auth-response.type';

type UserSignUpResponseDto = {
    user: UserAuthResponse;
    accessToken: string;
};

export { type UserSignUpResponseDto };
