import { type UserSignUpResponseDto } from 'shared/build/index.js';

interface IRepository<T = unknown> {
    find(): Promise<T>;

    findAll(): Promise<T[]>;

    findOneByEmail(email: string): Promise<T>;

    create(payload?: T): Promise<T>;

    update(): Promise<T>;

    getUserWithProfile(id: string): Promise<UserSignUpResponseDto['user']>;

    delete(id: string): Promise<T>;
}

export { type IRepository };
