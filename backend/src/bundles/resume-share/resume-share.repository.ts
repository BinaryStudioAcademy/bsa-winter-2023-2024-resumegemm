import { Guid } from 'guid-typescript';
import { type ResumeWithShare } from 'shared/build/bundles/resumes/types/resume-with-share.type.js';
import {
    type ResumeShareDeleteResponseDto,
    type ResumeShareGetResponseDto,
} from 'shared/build/index.js';
import { HttpCode, HTTPError } from 'shared/build/index.js';

import { ResumeShareErrorMessage } from './enums/error-messages.js';
import { type ResumeShareModel } from './resume-share.model.js';
import { type ResumeShareCreateResponseDto } from './types/types.js';

class ResumeShareRepository {
    private resumeShareModel: typeof ResumeShareModel;

    public constructor(resumeShareModel: typeof ResumeShareModel) {
        this.resumeShareModel = resumeShareModel;
    }

    public async getResumeShareLinkByResumeId(
        resumeId: string,
    ): Promise<ResumeShareGetResponseDto | undefined> {
        return await this.resumeShareModel
            .query()
            .findOne('resumeId', resumeId)
            .returning('*')
            .execute();
    }

    public async getShareLinksByIds(
        resumeIds: string[],
    ): Promise<ResumeWithShare[]> {
        const shareLinks = await this.resumeShareModel
            .query()
            .whereIn('resumeId', resumeIds)
            .withGraphFetched('[resume]');

        return shareLinks.map((link) => {
            const { id, ...resumeData } = link;

            return {
                resume: resumeData.resume,
                shareId: id,
            };
        });
    }

    public async getResumeShareLink(
        id: string,
    ): Promise<ResumeShareGetResponseDto | undefined> {
        try {
            const resumeShare = await this.resumeShareModel
                .query()
                .findById(id)
                .returning('*')
                .execute();

            if (!resumeShare) {
                throw new HTTPError({
                    message:
                        ResumeShareErrorMessage.RESUME_SHARE_NOT_FOUND_ERROR,
                    status: HttpCode.NOT_FOUND,
                });
            }

            return resumeShare;
        } catch (error) {
            if (error instanceof Error) {
                throw new HTTPError({
                    message: error.message,
                    status: HttpCode.BAD_REQUEST,
                });
            }
        }
    }

    public async createResumeShareLink(
        resumeId: string,
    ): Promise<ResumeShareCreateResponseDto | undefined> {
        try {
            const resumeShareModel = {
                resumeId: resumeId,
                id: Guid.raw(),
            };

            return await this.resumeShareModel
                .query()
                .insert(resumeShareModel)
                .returning('*')
                .execute();
        } catch (error) {
            if (error instanceof Error) {
                throw new HTTPError({
                    message: ResumeShareErrorMessage.RESUME_SHARE_CREATE_ERROR,
                    status: HttpCode.BAD_REQUEST,
                });
            }
        }
    }

    public async DeleteById(
        resumeId: string,
    ): Promise<ResumeShareDeleteResponseDto | unknown> {
        try {
            const resumeShare = await this.resumeShareModel
                .query()
                .deleteById(resumeId)
                .returning('*')
                .execute();

            if (!resumeShare) {
                throw new HTTPError({
                    message:
                        ResumeShareErrorMessage.RESUME_SHARE_NOT_FOUND_ERROR,
                    status: HttpCode.NOT_FOUND,
                });
            }

            return resumeShare;
        } catch (error) {
            if (error instanceof Error) {
                throw new HTTPError({
                    message: ResumeShareErrorMessage.RESUME_SHARE_DELETE_ERROR,
                    status: HttpCode.BAD_REQUEST,
                });
            }
        }
    }

    public async getShareLinkByResumeId(
        resumeId: string,
    ): Promise<ResumeShareGetResponseDto | undefined> {
        return await this.resumeShareModel
            .query()
            .where('resumeId', resumeId)
            .first()
            .execute();
    }
}

export { ResumeShareRepository };
