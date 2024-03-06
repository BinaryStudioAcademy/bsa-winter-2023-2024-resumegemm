import { type Profile } from '~/bundles/profile/types/types.js';

import { type OauthUserEntityFields } from './oauth-user-entity-fields.type.js';

type OauthUserWithProfileRelation = OauthUserEntityFields & {
    userProfile: Profile;
};

export { type OauthUserWithProfileRelation };
