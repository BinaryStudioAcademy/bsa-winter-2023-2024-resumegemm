import { type Profile } from '~/bundles/profile/types/types';

import { type OauthUserEntityFields } from './oauth-user-entity-fields.type';

type GithubUserWithProfileRelation = OauthUserEntityFields & {
    user_profile: Profile;
};

export { type GithubUserWithProfileRelation };
