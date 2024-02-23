import { type ResumeDto } from './resume-dto.type';

type ResumeCreateItemRequestDto = Omit<
    ResumeDto,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export { type ResumeCreateItemRequestDto };
