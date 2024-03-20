import { type UserWithProfileRelation } from './user-with-profile-relation.type.js';

type UserConfirmEmailResponse = {
    user: UserWithProfileRelation;
    accessToken: string;
    refreshToken: string;
    message: string;
};

export { type UserConfirmEmailResponse };
