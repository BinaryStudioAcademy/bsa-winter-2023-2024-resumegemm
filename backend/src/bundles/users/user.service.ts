import { type UserRepository } from '~/bundles/users/user.repository.js';
import { type IService } from '~/common/interfaces/interfaces.js';

import {
    type UserEntityFields,
    type UserGetAllResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from './types/types.js';

class UserService implements IService {
    private userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public find(): ReturnType<IService['find']> {
        return Promise.resolve(null);
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

    public async create(
        { email, firstName, lastName }: UserSignUpRequestDto,
        passwordSalt: string,
        passwordHash: string,
    ): Promise<Pick<UserEntityFields, 'id'>> {
        const user = await this.userRepository.createUserWithProfile(
            {
                email,
                passwordSalt,
                passwordHash,
            } as UserEntityFields,
            firstName,
            lastName,
        );
        return user.toObject();
    }

    public async getUserWithProfile(
        id: string,
    ): Promise<UserSignUpResponseDto['user']> {
        return this.userRepository.getUserWithProfile(id);
    }

    public update(): ReturnType<IService['update']> {
        return Promise.resolve(null);
    }

    public async delete(
        id: string,
    ): Promise<UserEntityFields | null> {
        return this.userRepository.delete(id);
    }
}

export { UserService };
