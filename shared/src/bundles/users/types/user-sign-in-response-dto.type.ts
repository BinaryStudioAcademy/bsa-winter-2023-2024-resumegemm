import { type UserWithProfileRelationAndOauthConnections } from './user-with-profile-and-oauth-connections.type';

type UserSignInResponseDto = {
    user: UserWithProfileRelationAndOauthConnections;
    accessToken: string;
    refreshToken: string;
};

export { type UserSignInResponseDto };
