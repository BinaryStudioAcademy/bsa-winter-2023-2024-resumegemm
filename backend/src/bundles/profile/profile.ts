import { ProfileModel } from '~/bundles/profile/profile.model.js';
import { ProfileRepository } from '~/bundles/profile/profile.repository.js';
import { ProfileService } from '~/bundles/profile/profile.service.js';

const profileRepository = new ProfileRepository(ProfileModel);
const profileService = new ProfileService(profileRepository);

export { profileRepository, profileService };
