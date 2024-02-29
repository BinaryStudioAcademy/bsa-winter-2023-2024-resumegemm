import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserModel } from '~/bundles/users/user.model.js';
import { AbstractRepository } from '~/common/database/abstract.repository.js';

import {
    type UserEntityFields,
    type UserWithProfileRelation,
} from './types/types.js';

type TUserRepo = {
    findOneByEmail(email: string): Promise<UserEntityFields | null>;
    findAll(): Promise<UserEntity[]>;
};

class UserRepository
    extends AbstractRepository<
        typeof UserModel,
        UserWithProfileRelation | UserEntityFields
    >
    implements TUserRepo
{
    public constructor({ userModel }: Record<'userModel', typeof UserModel>) {
        super(userModel);
    }

    public async findOneByEmail(
        email: string,
    ): ReturnType<TUserRepo['findOneByEmail']> {
        const user = await this.model
            .query()
            .findOne({ email })
            .whereNull('deletedAt');

        return user ?? null;
    }

    public async findAll(): ReturnType<TUserRepo['findAll']> {
        const users = await this.model.query().whereNull('deletedAt').execute();

        return users.map((it) => UserEntity.initialize(it));
    }

    public async delete(id: string): Promise<UserEntityFields> {
        const user = await this.model
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
