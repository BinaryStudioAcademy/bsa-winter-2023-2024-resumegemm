import { type ResumeShareRepository } from './resume-share.repository';
import { type IResumeShareService } from './types/resume-share.service.type';
import { type ResumeShareCreateResponseDto } from './types/types.js';

class ResumeShareService implements IResumeShareService {
    private resumeShareRepository: ResumeShareRepository;

    public constructor(resumeShareRepository: ResumeShareRepository) {
        this.resumeShareRepository = resumeShareRepository;
    }

    public async GetShareLink(
        id: string,
    ): Promise<ResumeShareCreateResponseDto | unknown> {
        return await this.resumeShareRepository.create(id);
    }
}

export { ResumeShareService };
