import { type UserWithProfileRelation } from './user-with-profile-nested-relation.type';

type UserSignUpResponseDto = {
    user: UserWithProfileRelation;
    token: string;
};

export { type UserSignUpResponseDto };
