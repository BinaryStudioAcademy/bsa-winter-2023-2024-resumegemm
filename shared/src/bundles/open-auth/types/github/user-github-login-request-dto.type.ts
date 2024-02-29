import { type Profile } from '~/bundles/profile/types/types';

import { type OauthUserEntityFields } from './oauth-user-entity-fields.type';

type UserGithubLoginRequestDto = Pick<Profile, 'firstName' | 'avatar'> &
    Pick<OauthUserEntityFields, 'oauthId' | 'oauthStrategy' | 'email'>;

export { type UserGithubLoginRequestDto };
