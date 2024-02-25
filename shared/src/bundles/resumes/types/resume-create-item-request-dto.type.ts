import { type Resume } from './types.js';

type ResumeCreateItemRequestDto = Omit<
    Resume,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export { type ResumeCreateItemRequestDto };
