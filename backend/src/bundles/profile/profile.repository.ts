import { Guid as guid } from 'guid-typescript';
import { type Transaction } from 'objection';
import { type Profile } from 'shared/build/index.js';

import { type ProfileModel } from '~/bundles/profile/profile.model';
import { type IRepository } from '~/common/interfaces/repository.interface.js';

class ProfileRepository implements Partial<IRepository> {
    private profileModel: typeof ProfileModel;

    public constructor(profileModel: typeof ProfileModel) {
        this.profileModel = profileModel;
    }

    public async create({
        firstName,
        lastName,
        transaction,
    }: {
        firstName: string;
        lastName: string;
        transaction: Transaction;
    }): Promise<Profile> {
        return this.profileModel
            .query()
            .insert({
                id: guid.raw(),
                firstName,
                lastName,
            })
            .transacting(transaction)
            .returning('*');
    }
}

export { ProfileRepository };
