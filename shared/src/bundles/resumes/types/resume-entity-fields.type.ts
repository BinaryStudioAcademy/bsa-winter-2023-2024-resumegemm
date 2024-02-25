import { type Resume } from './types';

type ResumeEntityFields = Omit<Resume, 'createdAt' | 'updatedAt' | 'deletedAt'>;

export { type ResumeEntityFields };
