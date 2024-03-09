import { type UserWithProfileRelation } from './user-with-profile-nested-relation.type';

type UserConfirmEmailResponse = {
    user: UserWithProfileRelation;
    accessToken: string;
    refreshToken: string;
    message: string;
};

export { type UserConfirmEmailResponse };
