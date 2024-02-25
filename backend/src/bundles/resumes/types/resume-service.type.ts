import {
    type ResumeCreateItemRequestDto,
    type ResumeUpdateItemRequestDto,
} from 'shared/build';

interface IResumeService<T> {
    find(id: string): Promise<T | undefined>;

    findAll(): Promise<{
        resumes: T[];
    }>;

    findAllByUserId(userId: string): Promise<{
        resumes: T[];
    }>;

    create(payload: ResumeCreateItemRequestDto): Promise<T>;

    update(id: string, data: ResumeUpdateItemRequestDto): Promise<T>;

    delete(id: string): Promise<boolean>;
}

export { type IResumeService };
