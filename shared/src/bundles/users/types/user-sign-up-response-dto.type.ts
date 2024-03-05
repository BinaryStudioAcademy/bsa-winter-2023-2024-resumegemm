import { type UserWithProfileRelationAndOauthConnections } from './user-with-profile-and-oauth-connections.type';

type UserSignUpResponseDto = {
    user: UserWithProfileRelationAndOauthConnections;
    token: string;
};

export { type UserSignUpResponseDto };
