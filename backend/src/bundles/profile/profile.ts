import { ProfileModel } from '~/bundles/profile/profile.model.js';
import { ProfileRepository } from '~/bundles/profile/profile.repository.js';

const profileRepository = new ProfileRepository({
    profileModel: ProfileModel,
});

export { profileRepository };
