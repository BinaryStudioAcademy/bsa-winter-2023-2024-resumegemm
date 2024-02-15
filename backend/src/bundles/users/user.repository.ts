import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserModel } from '~/bundles/users/user.model.js';
import { type IRepository } from '~/common/interfaces/interfaces.js';

import {
    type UserEntityFields,
    type UserSignUpResponseDto,
} from './types/types.js';

class UserRepository implements IRepository {
    private userModel: typeof UserModel;

    public constructor(userModel: typeof UserModel) {
        this.userModel = userModel;
    }

    public find(): ReturnType<IRepository['find']> {
        return Promise.resolve(null);
    }

    public async findOneByEmail(
        email: string,
    ): Promise<UserEntityFields | null> {
        const user = await this.userModel.query().findOne({ email });
        return user ?? null;
    }

    public async getUserWithProfile(
        id: string,
    ): Promise<UserSignUpResponseDto['user']> {
        return this.userModel
            .query()
            .modify('withoutHashPasswords')
            .findById(id)
            .withGraphFetched('[user_profile]')
            .castTo<UserSignUpResponseDto['user']>();
    }

    public async findAll(): Promise<UserEntity[]> {
        const users = await this.userModel.query().execute();

        return users.map((it) => UserEntity.initialize(it));
    }

    public async create(entity: UserEntity): Promise<UserEntity> {
        const { email, passwordSalt, passwordHash, id, profileId } =
            entity.toNewObject();

        const item = await this.userModel
            .query()
            .insert({
                id,
                email,
                passwordSalt,
                passwordHash,
                profileId,
            })
            .returning('*')
            .execute();

        return UserEntity.initialize(item);
    }

    public update(): ReturnType<IRepository['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<IRepository['delete']> {
        return Promise.resolve(true);
    }
}

export { UserRepository };
