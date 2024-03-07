import { type Transaction } from 'objection';

interface IRepository<T = unknown> {
    getById(id: string): Promise<T | null>;
    createWithTransaction(
        data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>,
        transaction: Transaction,
    ): Promise<T>;
    getUserWithProfile(id: string, modification?: string): Promise<T>;
}

export { type IRepository };
