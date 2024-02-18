import { type UserWithProfileRelation } from './user-with-profile-nested-relation.type';

type UserSignUpResponseDto = {
    user: UserWithProfileRelation;
};

export { type UserSignUpResponseDto };
