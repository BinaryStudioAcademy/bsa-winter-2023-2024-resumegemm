import { encryptPassword } from '~/bundles/auth/helpers/helpers.js';
import { type ProfileRepository } from '~/bundles/profile/profile.repository.js';
import { UserEntity } from '~/bundles/users/user.entity.js';
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
    private profileRepository: ProfileRepository;

    public constructor(
        userRepository: UserRepository,
        profileRepository: ProfileRepository,
    ) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
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

    public async create({
        email,
        password,
        firstName,
        lastName,
    }: UserSignUpRequestDto): Promise<Pick<UserEntityFields, 'id'>> {
        const { hash: passwordHash, salt: passwordSalt } =
            encryptPassword(password);
        const { id: profileId } = await this.profileRepository.create({
            firstName,
            lastName,
        });

        const user = await this.userRepository.create(
            UserEntity.initializeNew({
                email,
                profileId,
                passwordSalt,
                passwordHash,
            }),
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

    public delete(): ReturnType<IService['delete']> {
        return Promise.resolve(true);
    }
}

export { UserService };
