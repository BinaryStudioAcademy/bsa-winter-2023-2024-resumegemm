import { logger } from '~/common/logger/logger.js';

import { resumeService } from '../resumes/resumes.js';
import { ResumeShareController } from './resume-share.controller.js';
import { ResumeShareCoordinator } from './resume-share.coordinator.js';
import { ResumeShareModel } from './resume-share.model.js';
import { ResumeShareRepository } from './resume-share.repository.js';
import { ResumeShareService } from './resume-share.service.js';
import { resumeShareAccessService } from './resume-share-access.js';

const resumeShareRepository = new ResumeShareRepository(ResumeShareModel);
const resumeShareService = new ResumeShareService(
    resumeShareRepository,
    // resumeService,
    resumeShareAccessService,
);

const resumeShareCoordinator = new ResumeShareCoordinator(
    resumeService,
    resumeShareRepository,
);
const resumeShareController = new ResumeShareController(
    logger,
    resumeShareService,
    resumeShareCoordinator,
);

export { resumeShareController, resumeShareCoordinator, resumeShareService };
