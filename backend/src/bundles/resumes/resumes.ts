import { logger } from '~/common/logger/logger.js';

import { openAIService } from '../open-ai/open-ai.js';
import { ResumeController } from './resume.controller.js';
import { ResumeModel } from './resume.model.js';
import { ResumeRepository } from './resume.repository.js';
import { ResumeService } from './resume.service.js';

const resumeRepository = new ResumeRepository(ResumeModel);

const resumeService = new ResumeService(resumeRepository, openAIService);

const resumeController = new ResumeController(logger, resumeService);

export { resumeController, resumeService };
export { ResumeModel } from './resume.model.js';
