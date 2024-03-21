import { type Resume } from './resume.type';

type ResumeShareResponseDto = {
    id: string;
    resumeId: string;
    createdAt: string;
    updatedAt: string;
} & { resume: Pick<Resume, 'image' | 'resumeTitle'> };

export { type ResumeShareResponseDto };
