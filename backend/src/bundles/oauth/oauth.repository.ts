import { type UserGithubLoginResponseDto } from 'shared/build/index.js';

import { type OauthModel } from '~/bundles/oauth/oauth.model.js';
import { AbstractRepository } from '~/common/database/abstract.repository.js';

import { type OauthUserEntityFields } from './types/types.js';

type TOauthRepository = {
    findByOauthId(oauthId: number): Promise<OauthUserEntityFields | null>;
};

class OauthRepository
    extends AbstractRepository<
        typeof OauthModel,
        UserGithubLoginResponseDto | OauthUserEntityFields
    >
    implements TOauthRepository
{
    public constructor({
        oauthModel,
    }: Record<'oauthModel', typeof OauthModel>) {
        super(oauthModel);
    }

    public async findByOauthId(
        oauthId: number,
    ): Promise<OauthUserEntityFields | null> {
        const foundUser = await this.model
            .query()
            .where('oauth_id', oauthId)
            .first();
        return foundUser ?? null;
    }
}

export { OauthRepository };
