import { config } from '~/common/config/config';

import { OpenAIService } from './open-ai.service.js';

const {
    OPEN_AI: { API_KEY },
} = config.ENV;

const openAIService = new OpenAIService(API_KEY);

export { openAIService };
export { ModelSettings, Prompts } from './constants/constants.js';
export { Roles } from './enums/enums.js';
