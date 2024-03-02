import { type Profile } from '~/bundles/profile/types/profile-type.js';

import { type OauthConnectionEntityFields } from './oauth-connection-entity-fields.type';

type OauthUserLoginRequestDto = Pick<
    Profile,
    'firstName' | 'avatar' | 'lastName'
> &
    Pick<OauthConnectionEntityFields, 'oauthId' | 'oauthStrategy' | 'email'>;

export { type OauthUserLoginRequestDto };
