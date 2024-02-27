import { type ResumeShareRepository } from './resume-share.repository.js';
import { type ResumeShareAccessService } from './resume-share-access.service.js';
import { type IResumeShareService } from './types/resume-share.service.type.js';
import {
    type ResumeShareCreateResponseDto,
    type ResumeShareGetResponseDto,
} from './types/types.js';

class ResumeShareService implements IResumeShareService {
    private resumeShareRepository: ResumeShareRepository;
    private resumeShareAccessService: ResumeShareAccessService;

    public constructor(
        resumeShareRepository: ResumeShareRepository,
        resumeShareAccessService: ResumeShareAccessService,
    ) {
        this.resumeShareRepository = resumeShareRepository;
        this.resumeShareAccessService = resumeShareAccessService;
    }

    public async CreateShareLink(
        id: string,
    ): Promise<ResumeShareCreateResponseDto | unknown> {
        return await this.resumeShareRepository.create(id);
    }

    public async GetShareLink(
        id: string,
        ip: string,
    ): Promise<ResumeShareGetResponseDto | unknown> {
        await this.resumeShareAccessService.CreateShareAccess(id, ip);
        return await this.resumeShareRepository.getResume(id);
    }
}

export { ResumeShareService };
