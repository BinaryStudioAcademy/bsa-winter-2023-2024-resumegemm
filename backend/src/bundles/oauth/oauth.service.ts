import { HttpError } from 'shared/build/index.js';

import { type OauthRepository } from '~/bundles/oauth/oauth.repository';
import { type IService } from '~/common/interfaces/service.interface';

import {
    type OauthUserEntityFields,
    type UserGithubLoginRequestDto,
    type UserGithubLoginResponseDto,
} from './types/types.js';

class OauthService implements Pick<IService, 'create'> {
    private oauthRepository: OauthRepository;

    public constructor(userRepository: OauthRepository) {
        this.oauthRepository = userRepository;
    }

    public async getById(id: string): Promise<UserGithubLoginResponseDto> {
        return this.oauthRepository.getUserWithProfile(id);
    }

    public async create(
        userPayload: UserGithubLoginRequestDto,
    ): Promise<OauthUserEntityFields> {
        try {
            const foundUserByOauthId = await this.oauthRepository.findByOauthId(
                userPayload.oauthId,
            );
            if (foundUserByOauthId) {
                return foundUserByOauthId;
            }
            return this.oauthRepository.createUserWithProfile(userPayload);
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
