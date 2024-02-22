import OpenAI from 'openai';
import { type ValueOf } from 'shared/build';

import { ModelSettings } from './constants/model-settings';
import { type Prompts } from './constants/prompts';
import { Roles } from './enums/roles';

class OpenAIService {
    private openAI: OpenAI;

    public constructor(apiKey: string) {
        this.openAI = new OpenAI({ apiKey });
    }

    public async generateResponse<T>(
        systemMessage: ValueOf<typeof Prompts>,
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
            model: ModelSettings.MODEL_NAME,
            max_tokens: ModelSettings.MAX_TOKENS,
            response_format: { type: 'json_object' },
            temperature: ModelSettings.TEMPERATURE,
        });

        const result = response.choices[0].message.content as string;
        return JSON.parse(result) as T;
    }
}

export { OpenAIService };
