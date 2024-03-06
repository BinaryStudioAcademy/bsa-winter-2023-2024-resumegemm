import { config } from '~/common/config/config.js';

import { OpenAIService } from './open-ai.service.js';

const {
    OPEN_AI: { API_KEY },
} = config.ENV;

const openAIService = new OpenAIService(API_KEY);

export { openAIService };
export { MODEL_SETTINGS, PROMPTS } from './constants/constants.js';
export { Roles } from './enums/enums.js';
