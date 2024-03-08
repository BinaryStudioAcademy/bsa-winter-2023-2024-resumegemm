import { type OpenAuthApiPath } from '~/bundles/open-auth/enums/enums.js';
import { type OauthStrategy } from '~/bundles/open-auth/enums/oauth-strategy.enum.js';

type SocialMediaProfiles = {
    id: string | null;
    provider: OauthStrategy;
    connected: boolean;
    redirect: OpenAuthApiPath;
};

export { type SocialMediaProfiles };
