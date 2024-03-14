import { type UserAuthResponse } from './user-auth-response.type';

type UserResetPasswordResponse = UserAuthResponse & {
    accessToken: string;
    refreshToken: string;
    message: string;
};

export { type UserResetPasswordResponse };
