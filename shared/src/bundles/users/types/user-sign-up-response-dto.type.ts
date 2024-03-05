import { type UserAuthResponse } from './user-auth-response.type';

type UserSignUpResponseDto = UserAuthResponse & {
    token: string;
};

export { type UserSignUpResponseDto };
