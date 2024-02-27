import { type ResumeShareAccessRepository } from './resume-share-access.repository.js';
import { type ResumeShareAccessCreateResponseDto } from './types/types.js';

class ResumeShareAccessService {
    private resumeShareAccessRepository: ResumeShareAccessRepository;

    public constructor(
        resumeShareAccessRepository: ResumeShareAccessRepository,
    ) {
        this.resumeShareAccessRepository = resumeShareAccessRepository;
    }

    public async CreateShareAccess(
        resumeId: string,
        ip: string,
    ): Promise<ResumeShareAccessCreateResponseDto | unknown> {
        return await this.resumeShareAccessRepository.create(resumeId, ip);
    }
}

export { ResumeShareAccessService };
