import { type ResumeShareAccessGetResponseDto } from './resume-share-access-get-response-dto.type';
import { type ResumeShareResponseDto } from './resume-share-response-dto.type';

type ResumeShareDetailsGetResponseDto = ResumeShareResponseDto & {
    accesses: ResumeShareAccessGetResponseDto[];
};

export { type ResumeShareDetailsGetResponseDto };
