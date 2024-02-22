import { logger } from '~/common/logger/logger.js';

import { openAIService } from '../open-ai/open-ai.js';
import { ResumeController } from './resume.controller.js';
import { ResumeService } from './resume.service.js';

const resumeService = new ResumeService(openAIService);
const resumeController = new ResumeController(logger, resumeService);

export { resumeController };
export { ResumeModel } from './resume.model.js';
