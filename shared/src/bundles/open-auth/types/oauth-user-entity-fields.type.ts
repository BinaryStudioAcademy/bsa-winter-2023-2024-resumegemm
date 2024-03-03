import { type OauthStrategy } from '../enums/enums.js';

type OauthUserEntityFields = {
    id: string;
    email: string;
    oauthStrategy: OauthStrategy;
    oauthId: string;
    profileId: string;
};

export { type OauthUserEntityFields };
