import { type OauthConnectionEntityFields } from '~/bundles/open-auth/open-auth.js';
import { type Profile } from '~/bundles/profile/types/profile-type.js';
import { type UserAuthResponse } from '~/bundles/users/types/user-auth-response.type.js';

type UserWithProfileRelation = UserAuthResponse['user'] & {
    userProfile: Profile;
    oauth_connections: OauthConnectionEntityFields[];
};
export { type UserWithProfileRelation };
