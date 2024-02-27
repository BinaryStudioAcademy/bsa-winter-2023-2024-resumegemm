import { type ResumeShareAccessGetResponseDto } from './resume-share-access-get-response-dto.type';

type ResumeShareDetailsGetResponseDto = {
    id: string;
    resumeId: string;
    createdAt: string;
    updatedAt: string;
    accesses: ResumeShareAccessGetResponseDto[];
};

export { type ResumeShareDetailsGetResponseDto };
