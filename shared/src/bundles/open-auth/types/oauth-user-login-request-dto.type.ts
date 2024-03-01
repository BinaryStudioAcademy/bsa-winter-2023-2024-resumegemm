import { type Profile } from '~/bundles/profile/types/profile-type.js';

import { type OauthUserEntityFields } from './oauth-user-entity-fields.type.js';

type OauthUserLoginRequestDto = Pick<
    Profile,
    'firstName' | 'avatar' | 'lastName'
> &
    Pick<OauthUserEntityFields, 'oauthId' | 'oauthStrategy' | 'email'>;

export { type OauthUserLoginRequestDto };
