import {
    type Resume,
    type ResumeCreateItemRequestDto,
    type ResumeGetItemResponseDto,
    type ResumeUpdateItemRequestDto,
} from 'shared/build';

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
}

export { type IResumeService };
