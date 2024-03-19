import {
    type Resume,
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
    type ResumeCreateItemRequestDto,
    type ResumeGetItemResponseDto,
    type ResumeUpdateItemRequestDto,
    type ResumeViewsCountResponseDto,
    type ResumeWithRelationsAndTemplateResponseDto,
} from 'shared/build/index.js';

interface IResumeService {
    find(id: string): Promise<Resume | undefined>;

    findById(
        id: string,
    ): Promise<ResumeWithRelationsAndTemplateResponseDto | null>;

    findAll(): Promise<ResumeGetItemResponseDto[]>;

    findAllByUserId(userId: string): Promise<ResumeGetItemResponseDto[]>;

    create(
        payload: ResumeCreateItemRequestDto,
        userId: string,
        templateId: string,
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
