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

    public async updateAvatar({
        id,
        key = null,
    }: {
        id: string;
        key?: string | null;
    }): Promise<void> {
        await this.model.query().findById(id).patch({ avatar: key });
    }
}

export { ProfileRepository };
