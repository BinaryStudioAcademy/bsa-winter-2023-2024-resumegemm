import { HttpCode, HTTPError } from 'shared/build/index.js';

import { type ProfileRepository } from '~/bundles/profile/profile.repository.js';
import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserRepository } from '~/bundles/users/user.repository.js';
import { type IService } from '~/common/interfaces/interfaces.js';

import {
    type UserEntityFields,
    type UserGetAllResponseDto,
    type UserSignUpRequestDto,
    type UserWithProfileRelation,
} from './types/types.js';

class UserService implements Omit<IService, 'getById'> {
    private userRepository: UserRepository;
    private profileRepository: ProfileRepository;

    public constructor(
        userRepository: UserRepository,
        profileRepository: ProfileRepository,
    ) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    public async findByEmail(email: string): Promise<UserEntityFields | null> {
        return await this.userRepository.findOneByEmail(email);
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
        passwordSalt,
        passwordHash,
    }: UserSignUpRequestDto & {
        passwordSalt: string;
        passwordHash: string;
    }): Promise<Pick<UserEntityFields, 'id'>> {
        const transaction = await this.userRepository.model.startTransaction();
        try {
            const { id } = await this.profileRepository.createWithTransaction(
                {
                    firstName,
                    lastName,
                },
                transaction,
            );
            const item = (await this.userRepository.createWithTransaction(
                UserEntity.initializeNew({
                    email,
                    passwordSalt,
                    passwordHash,
                    profileId: id,
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

    public async getUserWithProfile(
        id: string,
    ): Promise<UserWithProfileRelation> {
        return this.userRepository.getUserWithProfile(
            id,
            'withoutHashPasswords',
        ) as Promise<UserWithProfileRelation>;
    }
}

export { UserService };
