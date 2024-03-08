import { ResumeShareAccessModel } from './resume-share-access.model.js';
import { ResumeShareAccessRepository } from './resume-share-access.repository.js';
import { ResumeShareAccessService } from './resume-share-access.service.js';

const resumeShareAccessRepository = new ResumeShareAccessRepository(
    ResumeShareAccessModel,
);
const resumeShareAccessService = new ResumeShareAccessService(
    resumeShareAccessRepository,
);

export { resumeShareAccessService };
