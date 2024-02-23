import { type ResumeDto } from './types';

type ResumeUpdateItemRequestDto = Partial<
    Omit<ResumeDto, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'userId'>
>;

export { type ResumeUpdateItemRequestDto };
