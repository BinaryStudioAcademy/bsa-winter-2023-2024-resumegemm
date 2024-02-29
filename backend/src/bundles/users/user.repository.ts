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
        const user = await this.model.query().findOne({ email });
        return user ?? null;
    }

    public async findAll(): ReturnType<TUserRepo['findAll']> {
        const users = await this.model.query().execute();

        return users.map((it) => UserEntity.initialize(it));
    }

    public async updateById(
        id: string,
        data: object,
    ): Promise<UserEntity | null> {
        await this.model.query().update(data).where('id', id).execute();

        const user = await this.model.query().findOne({ id });
        return user ? UserEntity.initialize(user) : null;
    }
}

export { UserRepository };
