import { Prompts } from '../open-ai/open-ai.js';
import { type OpenAIService } from '../open-ai/open-ai.service.js';
import {
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
} from './types/types';

class ResumeService {
    private openAIService: OpenAIService;

    public constructor(openAIService: OpenAIService) {
        this.openAIService = openAIService;
    }

    public async giveResumeScore({
        resume,
    }: ResumeAiScoreRequestDto): Promise<ResumeAiScoreResponseDto> {
        return await this.openAIService.generateResponse<ResumeAiScoreResponseDto>(
            Prompts.RESUME_SCORE,
            resume,
        );
    }
}

export { ResumeService };
