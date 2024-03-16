import {
    type Resume,
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
    type ResumeCreateItemRequestDto,
    type ResumeGetItemResponseDto,
    type ResumeUpdateItemRequestDto,
    type ResumeViewsCountResponseDto,
} from 'shared/build/index.js';

interface IResumeService {
    find(id: string): Promise<Resume | undefined>;

    findWithRelations(
        id: string,
    ): Promise<ResumeGetItemResponseDto | undefined>;

    findAll(): Promise<{
        resumes: ResumeGetItemResponseDto[];
    }>;

    findAllByUserId(userId: string): Promise<{
        resumes: ResumeGetItemResponseDto[];
    }>;

    create(
        payload: ResumeCreateItemRequestDto,
    ): Promise<ResumeGetItemResponseDto>;

    update(
        id: string,
        data: ResumeUpdateItemRequestDto,
    ): Promise<ResumeGetItemResponseDto>;

    delete(id: string): Promise<boolean>;

    giveResumeScore: (
        resumeAiScoreRequestDto: ResumeAiScoreRequestDto,
    ) => Promise<ResumeAiScoreResponseDto>;

    getResumeViews(userId: string): Promise<ResumeViewsCountResponseDto[]>;
}

export { type IResumeService };
