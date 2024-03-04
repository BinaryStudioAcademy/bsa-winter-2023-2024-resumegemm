import { PROMPTS } from '../open-ai/open-ai.js';
import { type OpenAIService } from '../open-ai/open-ai.service.js';
import {
    type IResumeService,
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
} from './types/types';

class ResumeService implements IResumeService {
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
