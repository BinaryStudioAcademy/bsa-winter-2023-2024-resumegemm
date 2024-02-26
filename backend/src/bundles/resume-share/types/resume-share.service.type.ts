import { type ResumeShareCreateResponseDto } from './types';

type IResumeShareService = {
    GetShareLink(id: string): Promise<ResumeShareCreateResponseDto | unknown>;
};

export { type IResumeShareService };
