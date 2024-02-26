import { Guid } from 'guid-typescript';
import { HttpCode, HttpError } from 'shared/build/index.js';

import { type IRepository } from '~/common/interfaces/interfaces.js';

import { ResumeShareErrorMessage } from './enums/error-messages.js';
import { type ResumeShareModel } from './resume-share.model.js';
import { type ResumeShareCreateResponseDto } from './types/types.js';

class ResumeShareRepository {
    private resumeShareModel: typeof ResumeShareModel;

    public constructor(resumeShareModel: typeof ResumeShareModel) {
        this.resumeShareModel = resumeShareModel;
    }

    public find(): ReturnType<IRepository['find']> {
        return Promise.resolve(null);
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
