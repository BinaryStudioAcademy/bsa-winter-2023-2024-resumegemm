import { type Transaction } from 'objection';

import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserModel } from '~/bundles/users/user.model.js';
import { AbstractRepository } from '~/common/database/abstract.repository.js';

import {
    type UserEntityFields,
    type UserWithRelations,
} from './types/types.js';

type TUserRepo = {
    findOneByEmail(email: string): Promise<UserEntityFields | null>;
    findAll(): Promise<UserEntity[]>;
};

class UserRepository
    extends AbstractRepository<
        typeof UserModel,
        UserWithRelations | UserEntityFields | UserEntity
    >
    implements TUserRepo
{
    public constructor({ userModel }: Record<'userModel', typeof UserModel>) {
        super(userModel);
    }

    public async findOneByEmail(
        email: string,
    ): ReturnType<TUserRepo['findOneByEmail']> {
        const user = await this.model.query().findOne({ email });
        return user ?? null;
    }

    public async findAll(): ReturnType<TUserRepo['findAll']> {
        const users = await this.model.query().execute();

        return users.map((it) => UserEntity.initialize(it));
    }

    public async updateEmailSubscriptionId(
        userId: string,
        emailSubscriptionId: string,
        transaction: Transaction,
    ): Promise<UserEntity> {
        const user = await this.model
            .query()
            .patch({ emailSubscriptionId })
            .where({ id: userId })
            .transacting(transaction)
            .returning('*')
            .execute();
        return UserEntity.initialize(user[0]);
    }
}

export { UserRepository };
