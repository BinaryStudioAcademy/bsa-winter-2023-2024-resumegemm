import { type OauthUserLoginResponseDto } from 'shared/build/index.js';

import { type OauthModel } from '~/bundles/oauth/oauth.model.js';
import { AbstractRepository } from '~/common/database/abstract.repository.js';

import { type OauthUserEntityFields } from './types/types.js';

type TOauthRepository = {
    findByOauthId(oauthId: string): Promise<OauthUserEntityFields | null>;
};

class OauthRepository
    extends AbstractRepository<
        typeof OauthModel,
        OauthUserLoginResponseDto | OauthUserEntityFields
    >
    implements TOauthRepository
{
    public constructor({
        oauthModel,
    }: Record<'oauthModel', typeof OauthModel>) {
        super(oauthModel);
    }

    public async findByOauthId(
        oauthId: string,
    ): ReturnType<TOauthRepository['findByOauthId']> {
        const foundUser = await this.model
            .query()
            .where('oauth_id', oauthId)
            .first();
        return foundUser ?? null;
    }
}

export { OauthRepository };