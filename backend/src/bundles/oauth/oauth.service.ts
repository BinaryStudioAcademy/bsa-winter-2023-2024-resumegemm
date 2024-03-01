import { HttpCode, HttpError } from 'shared/build/index.js';

import { type OauthRepository } from '~/bundles/oauth/oauth.repository';
import { type ProfileRepository } from '~/bundles/profile/profile.repository.js';
import { type IService } from '~/common/interfaces/service.interface';

import {
    type OauthUserEntityFields,
    type OauthUserLoginRequestDto,
    type OauthUserLoginResponseDto,
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

    public async getById(id: string): Promise<OauthUserLoginResponseDto> {
        return this.oauthRepository.getUserWithProfile(
            id,
        ) as Promise<OauthUserLoginResponseDto>;
    }

    public async create({
        firstName,
        avatar,
        email,
        oauthId,
        lastName,
        oauthStrategy,
    }: OauthUserLoginRequestDto): Promise<OauthUserEntityFields> {
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
                    lastName,
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
            const { message } = error as HttpError;
            throw new HttpError({
                message,
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }
    }
}

export { OauthService };
