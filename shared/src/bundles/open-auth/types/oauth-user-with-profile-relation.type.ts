import { type Profile } from '~/bundles/profile/types/types.js';

import { type OauthUserEntityFields } from './oauth-user-entity-fields.type.js';

type OauthUserWithProfileRelation = OauthUserEntityFields & {
    user_profile: Profile;
};

export { type OauthUserWithProfileRelation };
