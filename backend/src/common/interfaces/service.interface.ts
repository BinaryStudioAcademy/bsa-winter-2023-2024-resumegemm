import { type UserEntityFields } from 'shared/build/index.js';

interface IService<T = unknown> {
    findAll(): Promise<{
        items: T[];
    }>;

    deleteById(id: string): Promise<boolean>;

    getById(id: string): Promise<T>;

    findByEmail(email: string): Promise<T>;

    findByOauthIdAndCreate(data: T): Promise<void>;

    findByIdOrEmail(
        userId: string,
        email: string,
    ): Promise<UserEntityFields | null>;

    getUserWithProfileAndOauthConnections(id: string): Promise<T>;

    create(payload: T): Promise<T>;
}

export { type IService };
