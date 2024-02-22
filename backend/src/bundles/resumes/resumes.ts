import OpenAI from 'openai';

import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';

import { ResumeController } from './resume.controller.js';
import { ResumeService } from './resume.service.js';

const {
    OPEN_AI: { API_KEY },
} = config.ENV;

const openai = new OpenAI({ apiKey: API_KEY });

const resumeService = new ResumeService(openai);
const resumeController = new ResumeController(logger, resumeService);

export { resumeController };
export { ResumeModel } from './resume.model.js';
