import { type User } from './user.type';

type UserSignInResponseDto = {
    user: User;
    accessToken: string;
    refreshToken: string;
};

export { type UserSignInResponseDto };