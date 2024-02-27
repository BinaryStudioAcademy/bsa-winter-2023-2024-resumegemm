import { Guid } from 'guid-typescript';
import {
    type ResumeShareGetResponseDto,
    HttpCode,
    HttpError,
} from 'shared/build/index.js';

import { ResumeShareErrorMessage } from './enums/error-messages.js';
import { type ResumeShareModel } from './resume-share.model.js';
import { type ResumeShareCreateResponseDto } from './types/types.js';

class ResumeShareRepository {
    private resumeShareModel: typeof ResumeShareModel;

    public constructor(resumeShareModel: typeof ResumeShareModel) {
        this.resumeShareModel = resumeShareModel;
    }

    public async getResume(
        id: string,
    ): Promise<ResumeShareGetResponseDto | undefined> {
        const resumeShare = await this.resumeShareModel
            .query()
            .findById(id)
            .returning('*')
            .execute();

        if (!resumeShare) {
            throw new HttpError({
                message: ResumeShareErrorMessage.RESUME_SHARE_GET_ERROR,
                status: HttpCode.NOT_FOUND,
            });
        }

        return resumeShare;
    }

    public async create(
        resumeId: string,
    ): Promise<ResumeShareCreateResponseDto | unknown> {
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
                throw new HttpError({
                    message: ResumeShareErrorMessage.RESUME_SHARE_CREATE_ERROR,
                    status: HttpCode.BAD_REQUEST,
                });
            }
        }
    }
}

export { ResumeShareRepository };
