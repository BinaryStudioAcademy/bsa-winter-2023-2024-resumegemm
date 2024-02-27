import { type OauthStrategy } from '../../enums/enums.js';

type OauthUserEntityFields = {
    id: string;
    email: string;
    oauthStrategy: OauthStrategy;
    oauthId: number;
    profileId: string;
};

export { type OauthUserEntityFields };
