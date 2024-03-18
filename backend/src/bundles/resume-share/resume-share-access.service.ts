import { type ResumeShareAccessRepository } from './resume-share-access.repository.js';
import {
    type ResumeShareAccessCreateResponseDto,
    type ResumeShareAccessGetResponseDto,
} from './types/types.js';

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
    ): Promise<ResumeShareAccessGetResponseDto | unknown> {
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
