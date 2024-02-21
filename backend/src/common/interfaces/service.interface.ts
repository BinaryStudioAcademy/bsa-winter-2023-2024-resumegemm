import {
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from 'shared/build/index.js';

interface IService<T = unknown> {
    find(): Promise<T>;

    findAll(): Promise<{
        items: T[];
    }>;

    findByEmail(email: string): Promise<T>;

    getUserWithProfile(id: string): Promise<UserSignUpResponseDto['user']>;

    create(
        user: UserSignUpRequestDto,
        passwordSalt: string,
        passwordHash: string,
    ): Promise<T>;

    update(): Promise<T>;

    delete(): Promise<boolean>;
}

export { type IService };
