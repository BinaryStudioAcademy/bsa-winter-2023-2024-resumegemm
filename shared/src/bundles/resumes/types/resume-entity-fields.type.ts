import { type Resume } from './types.js';

type ResumeEntityFields = Omit<Resume, 'createdAt' | 'updatedAt' | 'deletedAt'>;

export { type ResumeEntityFields };
