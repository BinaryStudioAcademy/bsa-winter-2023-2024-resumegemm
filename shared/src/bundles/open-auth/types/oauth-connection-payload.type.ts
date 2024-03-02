import { type OauthStrategy } from '~/bundles/open-auth/open-auth.js';

type OauthConnectionPayload = {
    oauthId: string;
    email: string;
    oauthStrategy: OauthStrategy;
    userId: string;
};

export { type OauthConnectionPayload };
