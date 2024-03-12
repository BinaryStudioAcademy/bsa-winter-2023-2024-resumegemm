import {
    type Resume,
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
    type ResumeCreateItemRequestDto,
    type ResumeGetItemResponseDto,
    type ResumeUpdateItemRequestDto,
} from 'shared/build/index.js';

interface IResumeService {
    find(id: string): Promise<Resume | undefined>;

    findById(id: string): Promise<ResumeGetItemResponseDto | null>;

    findAll(): Promise<ResumeGetItemResponseDto>;

    findAllByUserId(userId: string): Promise<ResumeGetItemResponseDto>;

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
}

export { type IResumeService };
