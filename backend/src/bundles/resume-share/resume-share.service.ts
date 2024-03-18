import {
    type GetUserResumeSharesResponse,
    HTTPError,
} from 'shared/build/index.js';

import { HttpCode } from '../oauth/enums/enums.js';
import { type ResumeService } from '../resumes/resume.service.js';
import { ResumeShareErrorMessage } from './enums/error-messages.js';
import { type ResumeShareRepository } from './resume-share.repository.js';
import { type ResumeShareAccessService } from './resume-share-access.service.js';
import { type IResumeShareService } from './types/resume-share.service.type.js';
import {
    type ResumeShareCreateResponseDto,
    type ResumeShareDeleteResponseDto,
    type ResumeShareDetailsGetResponseDto,
    type ResumeShareGetResponseDto,
} from './types/types.js';

class ResumeShareService implements IResumeShareService {
    private resumeShareRepository: ResumeShareRepository;
    private resumeService: ResumeService;
    private resumeShareAccessService: ResumeShareAccessService;

    public constructor(
        resumeShareRepository: ResumeShareRepository,
        resumeService: ResumeService,
        resumeShareAccessService: ResumeShareAccessService,
    ) {
        this.resumeShareRepository = resumeShareRepository;
        this.resumeService = resumeService;
        this.resumeShareAccessService = resumeShareAccessService;
    }

    public async createShareLink(
        id: string,
    ): Promise<ResumeShareCreateResponseDto> {
        const shareLink =
            await this.resumeShareRepository.getResumeShareLinkByResumeId(id);

        if (shareLink) {
            return shareLink;
        }

        const createdAccess =
            await this.resumeShareRepository.createResumeShareLink(id);

        if (!createdAccess) {
            throw new HTTPError({
                message: ResumeShareErrorMessage.RESUME_SHARE_CREATE_ERROR,
                status: HttpCode.BAD_REQUEST,
            });
        }

        return createdAccess;
    }

    public async getShareLink(
        id: string,
        ip: string,
    ): Promise<ResumeShareGetResponseDto | unknown> {
        await this.resumeShareAccessService.createShareAccess(id, ip);
        return await this.resumeShareRepository.getResumeShareLink(id);
    }

    public async getUserShareLinksWithResumes(
        id: string,
    ): Promise<GetUserResumeSharesResponse> {
        try {
            const resumes = await this.resumeService.findAllByUserId(id);

            if (resumes.length === 0) {
                return {
                    resumes: [],
                };
            }

            const resumesIds = resumes.map((resume) => resume.id);

            const resumesWithLink =
                await this.resumeShareRepository.getShareLinksByIds(resumesIds);

            return {
                resumes: resumesWithLink,
            };
        } catch {
            throw new HTTPError({
                message: ResumeShareErrorMessage.RESUME_SHARES_NOT_FOUND_ERROR,
                status: HttpCode.BAD_REQUEST,
            });
        }
    }

    public async getShareLinkDetails(
        id: string,
    ): Promise<ResumeShareDetailsGetResponseDto> {
        const sharerLink = await this.resumeShareRepository.getResumeShareLink(
            id,
        );

        if (!sharerLink) {
            throw new HTTPError({
                message: ResumeShareErrorMessage.RESUME_SHARE_NOT_FOUND_ERROR,
                status: HttpCode.NOT_FOUND,
            });
        }

        return {
            ...sharerLink,
            accesses: await this.resumeShareAccessService.getResumeAccesses(id),
        };
    }

    public async deleteShareLink(
        id: string,
    ): Promise<ResumeShareDeleteResponseDto | unknown> {
        return await this.resumeShareRepository.DeleteById(id);
    }
}

export { ResumeShareService };
