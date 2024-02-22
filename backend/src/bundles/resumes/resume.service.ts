import { type OpenAI } from 'openai';

import {
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
} from './types/types';

class ResumeService {
    private openai: OpenAI;

    public constructor(openai: OpenAI) {
        this.openai = openai;
    }

    public async giveResumeScore({
        file,
    }: ResumeAiScoreRequestDto): Promise<ResumeAiScoreResponseDto> {
        const response = await this.openai.chat.completions.create({
            messages: [
                {
                    'role': 'system',
                    'content': `You are a resume reviewer. Give this resume a score from 1 to 100,
                    providing a brief overview of your thoughts. Decrease a score by a lot if resume doenst contain essential
                    information, such as Experience, Education, Technical Skills, and Personal Information.
                    Return a json containing the score and overview. The resume is attached.`,
                },
                {
                    'role': 'user',
                    'content': file,
                },
            ],
            model: 'gpt-3.5-turbo-0125',
            max_tokens: 150,
            response_format: { type: 'json_object' },
            temperature: 0.7,
        });

        const result = response.choices[0].message.content as string;
        return JSON.parse(result) as ResumeAiScoreResponseDto;
    }
}

export { ResumeService };
