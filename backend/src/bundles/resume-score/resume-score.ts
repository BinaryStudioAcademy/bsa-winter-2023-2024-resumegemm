import OpenAI from 'openai';

import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';

import { ResumeScoreController } from './resume-score.controller.js';
import { ResumeScoreService } from './resume-score.service.js';

const {
    OPEN_AI: { API_KEY },
} = config.ENV;

const openai = new OpenAI({ apiKey: API_KEY });

const resumeScoreService = new ResumeScoreService(openai);
const resumeScoreController = new ResumeScoreController(
    logger,
    resumeScoreService,
);

export { resumeScoreController };
