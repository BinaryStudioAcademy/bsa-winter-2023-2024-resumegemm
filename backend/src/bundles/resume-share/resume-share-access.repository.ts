import { Guid } from 'guid-typescript';
import {
    type ResumeShareAccessGetResponseDto,
    HttpCode,
    HttpError,
} from 'shared/build/index.js';

import { ResumeShareErrorMessage } from './enums/error-messages.js';
import { type ResumeShareAccessModel } from './resume-share-access.model.js';
import { type ResumeShareAccessCreateResponseDto } from './types/types.js';

class ResumeShareAccessRepository {
    private resumeShareAccessModel: typeof ResumeShareAccessModel;

    public constructor(resumeShareAccessModel: typeof ResumeShareAccessModel) {
        this.resumeShareAccessModel = resumeShareAccessModel;
    }

    public async create(
        resumeShareId: string,
        ip: string,
    ): Promise<ResumeShareAccessCreateResponseDto | unknown> {
        try {
            const resumeShareAccessModel = {
                resumeShareLinkId: resumeShareId,
                id: Guid.raw(),
                resumeShareAccessIp: ip,
            };

            return await this.resumeShareAccessModel
                .query()
                .insert(resumeShareAccessModel)
                .returning('*')
                .execute();
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError({
                    message:
                        ResumeShareErrorMessage.RESUME_SHARE_ACCESS_CREATE_ERROR,
                    status: HttpCode.BAD_REQUEST,
                });
            }
        }
    }

    public async getResumeAccesses(
        resumeShareId: string,
    ): Promise<ResumeShareAccessGetResponseDto | unknown> {
        return await this.resumeShareAccessModel
            .query()
            .where('resumeShareLinkId', resumeShareId)
            .returning('*')
            .execute();
    }
}

export { ResumeShareAccessRepository };
