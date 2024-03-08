import { type UserWithProfileRelation } from './user-with-profile-relation.type.js';

type UserSignUpResponseDto = {
    user: UserWithProfileRelation;
    token: string;
};

export { type UserSignUpResponseDto };
