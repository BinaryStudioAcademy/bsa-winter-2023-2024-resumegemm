import {
    type Resume,
    type ResumeCreateItemRequestDto,
    type ResumeGetAllResponseDto,
    type ResumeGetItemResponseDto,
    type ResumeUpdateItemRequestDto,
    type ResumeWithRelationsAndTemplateResponseDto,
} from 'shared/build';

import { type FindAllOptions } from '~/common/types/types.js';

interface IResumeRepository {
    find(id: string): Promise<Resume | undefined>;

    findById(
        id: string,
    ): Promise<ResumeWithRelationsAndTemplateResponseDto | null>;

    findAll(
        userId?: string,
        options?: FindAllOptions,
    ): Promise<ResumeGetAllResponseDto[]>;

    findAllByUserId(userId: string): Promise<ResumeGetAllResponseDto[]>;

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
}

export { type IResumeRepository };
