import { PROMPTS } from '../open-ai/open-ai.js';
import { type OpenAIService } from '../open-ai/open-ai.service.js';
import {
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
    type ResumeService as TResumeService,
} from './types/types';

class ResumeService implements TResumeService {
    private openAIService: OpenAIService;

    public constructor(openAIService: OpenAIService) {
        this.openAIService = openAIService;
    }

    public async giveResumeScore({
        resume,
    }: ResumeAiScoreRequestDto): Promise<ResumeAiScoreResponseDto> {
        return await this.openAIService.generateResponse<ResumeAiScoreResponseDto>(
            PROMPTS.RESUME_SCORE,
            resume,
        );
    }
}

export { ResumeService };
