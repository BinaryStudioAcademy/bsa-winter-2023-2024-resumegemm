import { type UserWithProfileRelation } from './user-with-profile-nested-relation.type';

type UserSignInResponseDto = {
    user: UserWithProfileRelation;
    accessToken: string;
    refreshToken: string;
};

export { type UserSignInResponseDto };
