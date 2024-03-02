import { type OauthStrategy } from '../enums/enums.js';

type OauthUserEntityFields = {
    id: string;
    email: string;
    oauthStrategy: OauthStrategy;
    oauthId: string;
    userId: string;
};

export { type OauthUserEntityFields };
