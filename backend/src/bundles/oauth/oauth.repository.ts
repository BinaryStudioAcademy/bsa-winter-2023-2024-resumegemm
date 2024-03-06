import { type OauthUserLoginResponseDto } from 'shared/build/bundles/open-auth/types/oauth-user-login-response-dto.type';

import { type OauthModel } from '~/bundles/oauth/oauth.model.js';
import { AbstractRepository } from '~/common/database/abstract.repository.js';

import { type OauthConnectionEntityFields } from './types/types.js';

interface IOauthRepository {
    findByOauthId(oauthId: string): Promise<OauthConnectionEntityFields | null>;
}

class OauthRepository
    extends AbstractRepository<
        typeof OauthModel,
        OauthUserLoginResponseDto | OauthConnectionEntityFields
    >
    implements IOauthRepository
{
    public constructor({
        oauthModel,
    }: Record<'oauthModel', typeof OauthModel>) {
        super(oauthModel);
    }

    public async findByOauthId(
        oauthId: string,
    ): ReturnType<IOauthRepository['findByOauthId']> {
        const foundUser = await this.model
            .query()
            .where('oauth_id', oauthId)
            .first();
        return foundUser ?? null;
    }
}

export { OauthRepository };
