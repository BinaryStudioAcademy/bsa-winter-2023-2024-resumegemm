import { type ResumeAiScoreRequestDto } from './resume-ai-score-request-dto.type';
import { type ResumeAiScoreResponseDto } from './resume-ai-score-response-dto.type';

interface IResumeService {
    giveResumeScore: (
        resumeAiScoreRequestDto: ResumeAiScoreRequestDto,
    ) => Promise<ResumeAiScoreResponseDto>;
}

export { type IResumeService };
