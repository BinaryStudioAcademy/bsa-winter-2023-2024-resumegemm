import OpenAI from 'openai';

import { type ValueOf } from '~/common/types/types.js';

import { MODEL_SETTINGS } from './constants/model-settings.js';
import { type PROMPTS } from './constants/prompts.js';
import { Roles } from './enums/roles.js';

class OpenAIService {
    private openAI: OpenAI;

    public constructor(apiKey: string) {
        this.openAI = new OpenAI({ apiKey });
    }

    public async generateResponse<T>(
        systemMessage: ValueOf<typeof PROMPTS>,
        userMessage: string,
    ): Promise<T> {
        const response = await this.openAI.chat.completions.create({
            messages: [
                {
                    'role': Roles.SYSTEM,
                    'content': systemMessage,
                },
                {
                    'role': Roles.USER,
                    'content': userMessage,
                },
            ],
            model: MODEL_SETTINGS.MODEL_NAME,
            max_tokens: MODEL_SETTINGS.MAX_TOKENS,
            response_format: { type: 'json_object' },
            temperature: MODEL_SETTINGS.TEMPERATURE,
        });

        const result = response.choices[0].message.content as string;
        return JSON.parse(result) as T;
    }
}

export { OpenAIService };
