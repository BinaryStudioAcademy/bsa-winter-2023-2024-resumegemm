import { type OauthStrategy } from '../enums/enums.js';

type OauthConnectionEntityFields = {
    id: string;
    email: string;
    oauthStrategy: OauthStrategy;
    oauthId: string;
    userId: string;
};

export { type OauthConnectionEntityFields };
