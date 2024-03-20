import { type ResumeShareAccessResponseDto } from 'shared/build/bundles/resumes/types/resume-share-access-response-dto.type.js';

import { type ResumeShareAccessRepository } from './resume-share-access.repository.js';
import { type ResumeShareAccessCreateResponseDto } from './types/types.js';

class ResumeShareAccessService {
    private resumeShareAccessRepository: ResumeShareAccessRepository;

    public constructor(
        resumeShareAccessRepository: ResumeShareAccessRepository,
    ) {
        this.resumeShareAccessRepository = resumeShareAccessRepository;
    }

    public async createShareAccess(
        resumeId: string,
        ip: string,
    ): Promise<ResumeShareAccessCreateResponseDto | unknown> {
        return await this.resumeShareAccessRepository.create(resumeId, ip);
    }

    public async getResumeAccesses(
        resumeId: string,
    ): Promise<ResumeShareAccessResponseDto[]> {
        return await this.resumeShareAccessRepository.getResumeAccesses(
            resumeId,
        );
    }

    public async getAccessCount(resumeShareLinkId: string): Promise<number> {
        return this.resumeShareAccessRepository.getAccessCount(
            resumeShareLinkId,
        );
    }
}

export { ResumeShareAccessService };
