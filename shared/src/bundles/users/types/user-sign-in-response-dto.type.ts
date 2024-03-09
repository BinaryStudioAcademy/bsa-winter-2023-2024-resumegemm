import { type UserWithProfileRelation } from './user-with-profile-relation.type.js';

type UserSignInResponseDto = {
    user: UserWithProfileRelation;
    accessToken: string;
    refreshToken: string;
};

export { type UserSignInResponseDto };
