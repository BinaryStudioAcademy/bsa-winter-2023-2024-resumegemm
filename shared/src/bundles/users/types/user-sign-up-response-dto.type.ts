import { type UserWithProfileRelation } from './user-with-profile-nested-relation.type';

type UserSignUpResponseDto = {
    user: UserWithProfileRelation;
    accessToken: string;
};

export { type UserSignUpResponseDto };
