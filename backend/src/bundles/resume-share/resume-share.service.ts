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
