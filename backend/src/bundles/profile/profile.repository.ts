import { Guid as guid } from 'guid-typescript';
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
    }: {
        firstName: string;
        lastName: string;
    }): Promise<Profile> {
        return this.profileModel
            .query()
            .insert({
                id: guid.raw(),
                firstName,
                lastName,
            })
            .returning('*');
    }
}

export { ProfileRepository };
