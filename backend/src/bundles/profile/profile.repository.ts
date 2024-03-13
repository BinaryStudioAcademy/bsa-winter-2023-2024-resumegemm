import { type Profile } from 'shared/build/index.js';

import { type ProfileModel } from '~/bundles/profile/profile.model.js';
import { AbstractRepository } from '~/common/database/abstract.repository.js';

class ProfileRepository extends AbstractRepository<
    typeof ProfileModel,
    Profile
> {
    public constructor({
        profileModel,
    }: Record<'profileModel', typeof ProfileModel>) {
        super(profileModel);
    }

    public async updateById(
        id: string,
        data: Partial<Omit<ProfileModel, 'id' | 'createdAt' | 'updatedAt'>>,
    ): Promise<ProfileModel> {
        return await this.model.query().updateAndFetchById(id, data);
    }
}

export { ProfileRepository };
