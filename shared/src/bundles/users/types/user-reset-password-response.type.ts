import { type UserWithProfileRelation } from './user-with-profile-nested-relation.type';

type UserResetPasswordResponse = {
    user: UserWithProfileRelation;
    accessToken: string;
    refreshToken: string;
    message: string;
};

export { type UserResetPasswordResponse };
