import { HttpError } from 'shared/build/index.js';

import { type OauthRepository } from '~/bundles/oauth/oauth.repository';
import { type ProfileRepository } from '~/bundles/profile/profile.repository.js';
import { type IService } from '~/common/interfaces/service.interface';

import {
    type OauthUserEntityFields,
    type UserGithubLoginRequestDto,
    type UserGithubLoginResponseDto,
} from './types/types.js';

class OauthService implements Pick<IService, 'create' | 'getById'> {
    private oauthRepository: OauthRepository;
    private profileRepository: ProfileRepository;

    public constructor(
        userRepository: OauthRepository,
        profileRepository: ProfileRepository,
    ) {
        this.oauthRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    public async getById(id: string): Promise<UserGithubLoginResponseDto> {
        return this.oauthRepository.getUserWithProfile(
            id,
        ) as Promise<UserGithubLoginResponseDto>;
    }

    public async create({
        firstName,
        avatar,
        email,
        oauthId,
        oauthStrategy,
    }: UserGithubLoginRequestDto): Promise<OauthUserEntityFields> {
        const foundUserByOauthId = await this.oauthRepository.findByOauthId(
            oauthId,
        );
        if (foundUserByOauthId) {
            return foundUserByOauthId;
        }

        const transaction = await this.oauthRepository.model.startTransaction();
        try {
            const { id } = await this.profileRepository.createWithTransaction(
                {
                    firstName,
                    avatar,
                },
                transaction,
            );
            const user = await this.oauthRepository.createWithTransaction(
                {
                    email,
                    oauthId,
                    oauthStrategy,
                    profileId: id,
                },
                transaction,
            );
            await transaction.commit();
            return user;
        } catch (error: unknown) {
            const { message, status } = error as HttpError;
            throw new HttpError({
                message,
                status,
            });
        }
    }
}

export { OauthService };
