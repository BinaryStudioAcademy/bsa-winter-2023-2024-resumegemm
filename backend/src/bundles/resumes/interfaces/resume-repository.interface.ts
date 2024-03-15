import {
    type Resume,
    type ResumeCreateItemRequestDto,
    type ResumeGetAllResponseDto,
    type ResumeGetItemResponseDto,
    type ResumeUpdateItemRequestDto,
    type ResumeWithRelationsAndTemplateResponseDto,
} from 'shared/build';

interface IResumeRepository {
    find(id: string): Promise<Resume | undefined>;

    findById(id: string): Promise<ResumeGetItemResponseDto | null>;

    findAll(): Promise<ResumeGetAllResponseDto[]>;

    findAllByUserId(userId: string): Promise<ResumeGetAllResponseDto[]>;

    getByUserIdTemplateId(
        userId: string,
        templateId: string,
    ): Promise<ResumeWithRelationsAndTemplateResponseDto>;

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
