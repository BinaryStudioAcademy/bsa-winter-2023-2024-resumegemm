import { ExceptionMessage, HttpCode, HttpError } from 'shared/build/index.js';

import { type OauthRepository } from '~/bundles/oauth/oauth.repository';
import { type UserService } from '~/bundles/users/user.service.js';
import { type IService } from '~/common/interfaces/service.interface';

import {
    type OauthConnectionPayload,
    type OauthUserLoginRequestDto,
    type UserEntityFields,
    type UserSignUpRequestDto,
} from './types/types.js';

class OauthService
    implements
        Pick<IService, 'create' | 'findByOauthIdAndCreate' | 'deleteById'>
{
    private oauthRepository: OauthRepository;
    private userService: UserService;

    public constructor(
        userRepository: OauthRepository,
        userService: UserService,
    ) {
        this.oauthRepository = userRepository;
        this.userService = userService;
    }

    public async deleteById(id: string): Promise<boolean> {
        const foundRecord = await this.oauthRepository.getById(id);
        if (!foundRecord) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: ExceptionMessage.INVALID_OAUTH_ID,
            });
        }
        return !!(await this.oauthRepository.deleteById(id));
    }

    public async findByOauthIdAndCreate(
        oauthPayload: OauthConnectionPayload,
    ): Promise<void> {
        const foundConnection = await this.oauthRepository.findByOauthId(
            oauthPayload.oauthId,
        );
        if (foundConnection) {
            return;
        }
        await this.oauthRepository.create(oauthPayload);
    }

    public async create({
        firstName,
        avatar,
        email,
        oauthId,
        lastName,
        oauthStrategy,
        userId,
    }: OauthUserLoginRequestDto): Promise<UserEntityFields> {
        const foundUser = await this.userService.findByIdOrEmail(userId, email);

        if (foundUser) {
            await this.findByOauthIdAndCreate({
                oauthId,
                email,
                oauthStrategy,
                userId,
            });
            return foundUser;
        }
        const foundConnection = await this.oauthRepository.findByOauthId(
            oauthId,
        );
        if (foundConnection) {
            const foundUser = await this.userService.getById(
                foundConnection.userId,
            );
            if (foundUser) {
                return foundUser;
            }
        }
        const user = await this.userService.create({
            email,
            lastName,
            avatar,
            firstName,
        } as UserSignUpRequestDto & { avatar: string });
        await this.findByOauthIdAndCreate({
            oauthId,
            email,
            oauthStrategy,
            userId: user.id,
        });
        return user as UserEntityFields;
    }
}

export { OauthService };
