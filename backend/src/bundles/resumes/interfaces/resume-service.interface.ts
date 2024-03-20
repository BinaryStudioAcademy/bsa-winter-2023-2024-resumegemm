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

import { type FindAllOptions } from '~/common/types/types.js';

interface IResumeService {
    find(id: string): Promise<Resume | undefined>;

    findById(
        id: string,
    ): Promise<ResumeWithRelationsAndTemplateResponseDto | null>;

    findAll(options?: FindAllOptions): Promise<ResumeGetItemResponseDto[]>;

    findAllByUserId(
        userId: string,
        options?: FindAllOptions,
    ): Promise<ResumeGetItemResponseDto[]>;

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

    getResumeViews(
        userId: string,
        optios?: FindAllOptions,
    ): Promise<ResumeViewsCountResponseDto[]>;
}

export { type IResumeService };
