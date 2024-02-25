import { type Resume } from './types';

type ResumeUpdateItemRequestDto = Partial<
    Omit<Resume, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'userId'>
>;

export { type ResumeUpdateItemRequestDto };
