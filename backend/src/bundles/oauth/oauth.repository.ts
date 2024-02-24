import { Guid as guid } from 'guid-typescript';
import { type Transaction } from 'objection';
import { HttpCode, HttpError } from 'shared/build/index.js';

import { type OauthModel } from '~/bundles/oauth/oauth.model.js';
import { type ProfileRepository } from '~/bundles/profile/profile.repository';
import { type IRepository } from '~/common/interfaces/interfaces.js';

import {
    type GithubUserWithProfileRelation,
    type OauthUserEntityFields,
    type UserGithubLoginRequestDto,
} from './types/types.js';

class OauthRepository implements Partial<IRepository> {
    private oauthModel: typeof OauthModel;
    private profileRepository: ProfileRepository;

    public constructor(
        oauthModel: typeof OauthModel,
        profileRepository: ProfileRepository,
    ) {
        this.oauthModel = oauthModel;
        this.profileRepository = profileRepository;
    }

    public async findByOauthId(
        oauthId: number,
    ): Promise<OauthUserEntityFields | null> {
        const foundUser = await this.oauthModel
            .query()
            .where('oauth_id', oauthId)
            .first();
        return foundUser ?? null;
    }

    public async getUserWithProfile(
        id: string,
    ): Promise<GithubUserWithProfileRelation> {
        return this.oauthModel
            .query()
            .findById(id)
            .withGraphFetched('[user_profile]')
            .castTo<GithubUserWithProfileRelation>();
    }

    public async createUserWithProfile({
        email,
        firstName,
        avatar,
        oauthId,
        oauthStrategy,
    }: UserGithubLoginRequestDto): Promise<OauthUserEntityFields> {
        const transaction = await this.oauthModel.startTransaction();
        try {
            const { id } = await this.profileRepository.create({
                firstName,
                avatar,
                transaction,
            });

            const user = await this.create({
                email,
                oauthId,
                oauthStrategy,
                id: guid.raw(),
                profileId: id,
                transaction,
            });
            await transaction.commit();
            return user;
        } catch (error: unknown) {
            const { message } = error as HttpError;
            await transaction.rollback();
            throw new HttpError({
                message,
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }
    }

    public async create({
        email,
        oauthId,
        oauthStrategy,
        id,
        profileId,
        transaction,
    }: OauthUserEntityFields & {
        transaction: Transaction;
    }): Promise<OauthUserEntityFields> {
        return this.oauthModel
            .query()
            .insert({
                id,
                email,
                oauthId,
                oauthStrategy,
                profileId,
            })
            .returning('*')
            .transacting(transaction)
            .execute();
    }
}

export { OauthRepository };
