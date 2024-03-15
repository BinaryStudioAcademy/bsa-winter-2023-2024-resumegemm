import { type Transaction } from 'objection';

interface IRepository<T = unknown> {
    getById(id: string): Promise<T | null>;

    create(data: T): Promise<T>;

    createWithTransaction(
        data: Omit<
            T,
            | 'id'
            | 'createdAt'
            | 'updatedAt'
            | 'email'
            | 'profileId'
            | 'stripeId'
        >,
        transaction: Transaction,
    ): Promise<T>;

    deleteById(id: string): Promise<number>;

    getUserWithProfileAndOauthConnections(
        id: string,
        modification?: string,
    ): Promise<T>;
}

export { type IRepository };
