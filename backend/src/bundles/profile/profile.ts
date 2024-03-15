import { ProfileModel } from '~/bundles/profile/profile.model.js';
import { ProfileRepository } from '~/bundles/profile/profile.repository.js';
import { fileService } from '~/common/files/files.js';
import { logger } from '~/common/logger/logger.js';

import { ProfileController } from './profile.controller.js';
import { ProfileService } from './profile.service.js';

const profileRepository = new ProfileRepository({
    profileModel: ProfileModel,
});

const profileService = new ProfileService(fileService, profileRepository);

const profileController = new ProfileController(logger, profileService);

export { profileController, profileRepository, profileService };
