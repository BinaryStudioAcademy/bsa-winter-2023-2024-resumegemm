import { logger } from '~/common/logger/logger.js';

import { ResumeController } from './resume.controller.js';
import { ResumeModel } from './resume.model.js';
import { ResumeRepository } from './resume.repository.js';
import { ResumeService } from './resume.service.js';

const resumeRepository = new ResumeRepository(ResumeModel);

const resumeService = new ResumeService(resumeRepository);

const resumeController = new ResumeController(logger, resumeService);

export { resumeController, resumeService };
export { ResumeModel } from './resume.model.js';
