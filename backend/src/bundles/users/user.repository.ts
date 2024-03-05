import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserModel } from '~/bundles/users/user.model.js';
import { AbstractRepository } from '~/common/database/abstract.repository.js';

import {
    type UserEntityFields,
    type UserWithProfileRelationAndOauthConnections,
} from './types/types.js';

type TUserRepo = {
    findOneByEmail(email: string): Promise<UserEntityFields | null>;
    findAll(): Promise<UserEntity[]>;
};

class UserRepository
    extends AbstractRepository<
        typeof UserModel,
        UserWithProfileRelationAndOauthConnections | UserEntityFields
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

    public async updateById(
        id: string,
        data: Partial<Omit<UserModel, 'createdAt' | 'updatedAt'>>,
    ): Promise<UserModel> {
        return await this.model.query().updateAndFetchById(id, data);
    }

    public async findAll(): ReturnType<TUserRepo['findAll']> {
        const users = await this.model.query().execute();

        return users.map((it) => UserEntity.initialize(it));
    }
}

export { UserRepository };
