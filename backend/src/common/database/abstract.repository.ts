import { Guid as guid } from 'guid-typescript';
import { type Transaction } from 'objection';

import { type IRepository } from '../interfaces/interfaces.js';
import { type Abstract as AbstractModel } from './abstract.model.js';

class AbstractRepository<T extends typeof AbstractModel, K>
    implements IRepository<K>
{
    private readonly modelInstance: T;

    public constructor(model: T) {
        this.modelInstance = model;
    }

    public get model(): T {
        return this.modelInstance;
    }

    public getById(id: string): Promise<K> {
        return this.modelInstance.query().findById(id).castTo<K>().execute();
    }

    public createWithTransaction(
        data: Omit<K, 'id' | 'createdAt' | 'updatedAt'>,
        transaction: Transaction,
    ): Promise<K> {
        return this.modelInstance
            .query()
            .insert({
                ...data,
                id: guid.raw(),
            })
            .returning('*')
            .transacting(transaction)
            .castTo<K>()
            .execute();
    }

    public getUserWithProfile(id: string, modification?: string): Promise<K> {
        let query = this.modelInstance
            .query()
            .findById(id)
            .withGraphFetched('[user_profile, emailSubscription]');
        if (modification) {
            query = query.modify(modification);
        }
        return query.castTo<K>().execute();
    }
}

export { AbstractRepository };
