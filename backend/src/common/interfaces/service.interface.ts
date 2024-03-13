import { type IncomingHttpHeaders } from 'node:http';

import {
    type FindByEmailRequestDto,
    type UserEntityFields,
} from 'shared/build/index.js';

interface IService<T = unknown> {
    findAll(): Promise<{
        items: T[];
    }>;

    deleteById(id: string): Promise<boolean>;

    getById(id: string): Promise<T>;

    findByEmail(data: FindByEmailRequestDto): Promise<T>;

    findByOauthIdAndCreate(data: T): Promise<void>;

    findByIdOrEmail(
        userId: string,
        email: string,
    ): Promise<UserEntityFields | null>;

    getUserWithProfileAndOauthConnections(id: string): Promise<T>;

    create(payload: T): Promise<T>;

    delete(headers: IncomingHttpHeaders): Promise<UserEntityFields>;
}

export { type IService };
