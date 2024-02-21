import { type Transaction } from 'objection';

import { type ProfileRepository } from '~/bundles/profile/profile.repository';
import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserModel } from '~/bundles/users/user.model.js';
import { type IRepository } from '~/common/interfaces/interfaces.js';

import {
    type UserEntityFields,
    type UserSignUpResponseDto,
} from './types/types.js';

class UserRepository implements IRepository {
    private userModel: typeof UserModel;
    private profileRepository: ProfileRepository;

    public constructor(
        userModel: typeof UserModel,
        profileRepository: ProfileRepository,
    ) {
        this.userModel = userModel;
        this.profileRepository = profileRepository;
    }

    public find(): ReturnType<IRepository['find']> {
        return Promise.resolve(null);
    }

    public async findOneByEmail(
        email: string,
    ): Promise<UserEntityFields | null> {
        const user = await this.userModel
            .query()
            .findOne({ email })
            .whereNull('deletedAt');
            
        return user ?? null;
    }

    public async getUserWithProfile(
        id: string,
    ): Promise<UserSignUpResponseDto['user']> {
        return this.userModel
            .query()
            .modify('withoutHashPasswords')
            .findById(id)
            .whereNull('deletedAt')
            .withGraphFetched('[user_profile]')
            .castTo<UserSignUpResponseDto['user']>();
    }

    public async findAll(): Promise<UserEntity[]> {
        const users = await this.userModel
            .query()
            .whereNull('deletedAt')
            .execute();

        return users.map((it) => UserEntity.initialize(it));
    }

    public async createUserWithProfile(
        entity: UserEntityFields,
        firstName: string,
        lastName: string,
    ): Promise<UserEntity> {
        const transaction = await this.userModel.startTransaction();
        try {
            const { id } = await this.profileRepository.create({
                firstName,
                lastName,
                transaction,
            });

            const user = await this.create({
                entity: UserEntity.initializeNew({
                    ...entity,
                    profileId: id,
                }),
                transaction,
            });
            await transaction.commit();
            return user;
        } catch (error: unknown) {
            await transaction.rollback();
            throw new Error((error as Error).message);
        }
    }

    public async create({
        entity,
        transaction,
    }: {
        entity: UserEntity;
        transaction: Transaction;
    }): Promise<UserEntity> {
        const { email, passwordSalt, passwordHash, id, profileId } =
            entity.toNewObject();
        const item = await this.userModel
            .query()
            .insert({
                id,
                email,
                profileId,
                passwordSalt,
                passwordHash,
            })
            .returning('*')
            .transacting(transaction)
            .execute();
        return UserEntity.initialize(item);
    }

    public update(): ReturnType<IRepository['update']> {
        return Promise.resolve(null);
    }

    public async delete(
        id: string
    ): Promise<UserEntityFields> {
            const user = await this.userModel
                .query()
                .findOne({ id })
                .whereNull('deletedAt')
                .patch({ deletedAt: new Date().toISOString() })
                .returning(['id', 'email', 'deleted_at', 'profile_id'])
                .castTo<UserEntityFields>();
        
            return user ?? null;
    }
}

export { UserRepository };
