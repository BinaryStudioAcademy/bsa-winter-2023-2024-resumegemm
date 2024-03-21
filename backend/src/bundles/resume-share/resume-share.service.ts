import { HTTPError } from 'shared/build/index.js';

import { HttpCode } from '../oauth/enums/enums.js';
import { ResumeShareErrorMessage } from './enums/error-messages.js';
import { type ResumeShareModel } from './resume-share.model.js';
import { type ResumeShareRepository } from './resume-share.repository.js';
import { type ResumeShareAccessService } from './resume-share-access.service.js';
import { type IResumeShareService } from './types/resume-share.service.type.js';
import {
    type ResumeShareCreateResponseDto,
    type ResumeShareDeleteResponseDto,
    type ResumeShareDetailsGetResponseDto,
    // type ResumeShareGetResponseDto,
} from './types/types.js';

class ResumeShareService implements IResumeShareService {
    private resumeShareRepository: ResumeShareRepository;
    // private resumeService: ResumeService;
    private resumeShareAccessService: ResumeShareAccessService;

    public constructor(
        resumeShareRepository: ResumeShareRepository,
        // resumeService: ResumeService,
        resumeShareAccessService: ResumeShareAccessService,
    ) {
        this.resumeShareRepository = resumeShareRepository;
        // this.resumeService = resumeService;
        this.resumeShareAccessService = resumeShareAccessService;
    }

    public async createShareLink(
        id: string,
    ): Promise<Omit<ResumeShareCreateResponseDto, 'resume'>> {
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

    // public async getShareLink(
    //     id: string,
    //     ip: string,
    // ): Promise<ResumeShareGetResponseDto | unknown> {
    //     await this.resumeShareAccessService.createShareAccess(id, ip);

    //     const sharedResume =
    //         await this.resumeShareRepository.getResumeShareLink(id);

    //     if (!sharedResume) {
    //         return;
    //     }

    //     const resume = await this.resumeService.findById(sharedResume.resumeId);

    //     if (resume) {
    //         const { image, resumeTitle } = resume;

    //         return { ...sharedResume, resume: { image, resumeTitle } };
    //     }
    // }

    public async getShareLinkDetails(
        id: string,
    ): Promise<Omit<ResumeShareDetailsGetResponseDto, 'resume'>> {
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

    public async getResumeShareRecordByResumeId(
        resumeId: string,
    ): Promise<ResumeShareCreateResponseDto | unknown> {
        return await this.resumeShareRepository.getResumeShareLinkByResumeId(
            resumeId,
        );
    }

    public async getShareLinkByResumeId(
        resumeId: string,
    ): Promise<ResumeShareModel | undefined> {
        return await this.resumeShareRepository.getShareLinkByResumeId(
            resumeId,
        );
    }
}

export { ResumeShareService };
