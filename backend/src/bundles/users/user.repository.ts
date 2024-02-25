import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserModel } from '~/bundles/users/user.model.js';
import { AbstractRepository } from '~/common/database/abstract.repository.js';

import {
    type UserEntityFields,
    type UserWithProfileRelation,
} from './types/types.js';

class UserRepository extends AbstractRepository<
    typeof UserModel,
    UserWithProfileRelation | UserEntityFields
> {
    public constructor({ userModel }: Record<'userModel', typeof UserModel>) {
        super(userModel);
    }

    public async findOneByEmail(
        email: string,
    ): Promise<UserEntityFields | null> {
        const user = await this.model.query().findOne({ email });
        return user ?? null;
    }

    public async findAll(): Promise<UserEntity[]> {
        const users = await this.model.query().execute();

        return users.map((it) => UserEntity.initialize(it));
    }
}

export { UserRepository };
