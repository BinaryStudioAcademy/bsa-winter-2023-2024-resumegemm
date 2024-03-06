import { type Profile } from '~/bundles/profile/types/profile-type';

import { type OauthConnectionEntityFields } from './oauth-connection-entity-fields.type.js';

type OauthUserLoginResponseDto = OauthConnectionEntityFields & {
    userProfile: Profile;
};

export { type OauthUserLoginResponseDto };
