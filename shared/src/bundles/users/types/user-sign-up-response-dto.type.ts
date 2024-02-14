import { type User } from './user.type';

type UserSignUpResponseDto = {
    user: User;
    accessToken: string;
    refreshToken: string;
};

export { type UserSignUpResponseDto };
