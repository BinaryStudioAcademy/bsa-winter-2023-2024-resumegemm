import { type IncomingHttpHeaders } from 'node:http';

import { type JwtPayload } from 'jsonwebtoken';
import {
    type FindByEmailRequestDto,
    type UpdateUserProfileAndEmailRequestDto,
    validateUrl,
} from 'shared/build/index.js';
import { HttpCode, HTTPError } from 'shared/build/index.js';

import { type ProfileRepository } from '~/bundles/profile/profile.repository.js';
import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserRepository } from '~/bundles/users/user.repository.js';
import { config } from '~/common/config/config.js';
import { type FileService } from '~/common/files/file.service.js';
import { type IService } from '~/common/interfaces/interfaces.js';

import { decodeToken, getToken } from '../auth/helpers/helpers.js';
import { generateResetPasswordToken } from '../auth/helpers/token/token.js';
import {
    type UserEntityFields,
    type UserGetAllResponseDto,
    type UserSignUpRequestDto,
    type UserWithProfileRelation,
} from './types/types.js';
import { type UserModel } from './user.model.js';

class UserService
    implements Omit<IService, 'findByOauthIdAndCreate' | 'deleteById'>
{
    private userRepository: UserRepository;
    private profileRepository: ProfileRepository;
    private fileService: FileService;

    public constructor(
        userRepository: UserRepository,
        profileRepository: ProfileRepository,
        fileService: FileService,
    ) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.fileService = fileService;
    }

    public async findByEmail({
        email,
        withDeleted = false,
    }: FindByEmailRequestDto): Promise<UserModel | null> {
        if (!email) {
            return null;
        }
        return await this.userRepository.findOneByEmail({ email, withDeleted });
    }

    public async findByIdOrEmail(
        userId: string,
        email: string,
    ): ReturnType<IService['findByIdOrEmail']> {
        const [userById, userByEmail] = await Promise.all([
            this.getById(userId),
            this.findByEmail({ email }),
        ]);

        return userById ?? userByEmail ?? null;
    }

    public async getById(id: string): Promise<UserEntityFields | null> {
        return this.userRepository.getById(id) as Promise<UserEntityFields>;
    }

    public async findAll(): Promise<UserGetAllResponseDto> {
        const items = await this.userRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create({
        email,
        firstName,
        lastName,
        avatar,
        passwordSalt,
        passwordHash,
        emailConfirmed,
    }: UserSignUpRequestDto & {
        passwordSalt?: string;
        passwordHash?: string;
        avatar?: string;
    }): Promise<Pick<UserEntityFields, 'id' | 'email'>> {
        const transaction = await this.userRepository.model.startTransaction();
        try {
            const { id } = await this.profileRepository.createWithTransaction(
                {
                    firstName,
                    lastName,
                    avatar,
                },
                transaction,
            );
            const item = (await this.userRepository.createWithTransaction(
                UserEntity.initializeNew({
                    email,
                    passwordSalt: passwordSalt ?? null,
                    passwordHash: passwordHash ?? null,
                    profileId: id,
                    emailConfirmed,
                }),
                transaction,
            )) as UserEntityFields;
            await transaction.commit();

            const user = UserEntity.initialize(item);
            return user.toObject();
        } catch (error: unknown) {
            await transaction.rollback();
            throw new HTTPError({
                status: HttpCode.INTERNAL_SERVER_ERROR,
                message: (error as HTTPError).message,
            });
        }
    }

    public async updateUserProfileAndEmail(
        id: string,
        { firstName, lastName, email }: UpdateUserProfileAndEmailRequestDto,
    ): Promise<UserWithProfileRelation> {
        const { profileId } = await this.userRepository.updateById(id, {
            email,
        });
        await this.profileRepository.updateById(profileId, {
            firstName,
            lastName,
        });

        return this.getUserWithProfileAndOauthConnections(id);
    }

    public async getUserWithProfileAndOauthConnections(
        id: string,
    ): Promise<UserWithProfileRelation> {
        const user =
            (await this.userRepository.getUserWithProfileAndOauthConnections(
                id,
                'withoutHashPasswords',
            )) as UserWithProfileRelation;

        const { userProfile } = user;

        const isValidAvatarUrl =
            userProfile.avatar && validateUrl(userProfile.avatar);

        if (userProfile.avatar && !isValidAvatarUrl) {
            const generatedAvatarUrl = await this.fileService.getFileUrl(
                userProfile.avatar,
            );

            userProfile.avatar = generatedAvatarUrl;
        }

        return user;
    }

    public async confirmEmail(id: string): Promise<void> {
        return await this.userRepository.confirmEmail(id);
    }

    public async createResetPasswordToken(id: string): Promise<string> {
        const resetPasswordToken = generateResetPasswordToken();

        const resetPasswordTokenExpiry =
            Date.now() + Number(config.ENV.RESET_PASSWORD_TOKEN.EXPIRES_IN);

        await this.userRepository.updateById(id, {
            resetPasswordTokenExpiry,
            resetPasswordToken,
        });

        return resetPasswordToken;
    }

    public async delete(
        headers: IncomingHttpHeaders,
    ): Promise<UserEntityFields> {
        const token = getToken(headers);

        if (!token) {
            throw new HTTPError({
                message: 'Token not found',
                status: HttpCode.BAD_REQUEST,
            });
        }

        const { id } = decodeToken(token) as JwtPayload;
        return await this.userRepository.delete(id);
    }

    public async addStripeId(
        stripeId: string,
        email: string,
    ): Promise<UserEntityFields | null> {
        return await this.userRepository.addStripeId({
            stripeId,
            email,
        });
    }

    public async changePassword({
        id,
        passwordHash,
        passwordSalt,
    }: {
        id: string;
        passwordHash: string;
        passwordSalt: string;
    }): Promise<void> {
        await this.userRepository.updateById(id, {
            resetPasswordToken: null,
            resetPasswordTokenExpiry: null,
        });

        await this.userRepository.changePassword({
            id,
            passwordHash,
            passwordSalt,
        });
    }
}

export { UserService };
