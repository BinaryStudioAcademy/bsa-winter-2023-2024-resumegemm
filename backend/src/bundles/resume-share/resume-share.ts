import { logger } from '~/common/logger/logger.js';

import { ResumeShareController } from './resume-share.controller.js';
import { ResumeShareModel } from './resume-share.model.js';
import { ResumeShareRepository } from './resume-share.repository.js';
import { ResumeShareService } from './resume-share.service.js';
import { resumeShareAccessService } from './resume-share-access.js';

const resumeShareRepository = new ResumeShareRepository(ResumeShareModel);
const resumeShareService = new ResumeShareService(
    resumeShareRepository,
    resumeShareAccessService,
);
const resumeShareController = new ResumeShareController(
    logger,
    resumeShareService,
);

export { resumeShareController, resumeShareService };
