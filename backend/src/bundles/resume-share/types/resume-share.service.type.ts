import { type ResumeShareCreateResponseDto } from './types.js';

type IResumeShareService = {
    createShareLink(
        id: string,
    ): Promise<ResumeShareCreateResponseDto | unknown>;
};

export { type IResumeShareService };
