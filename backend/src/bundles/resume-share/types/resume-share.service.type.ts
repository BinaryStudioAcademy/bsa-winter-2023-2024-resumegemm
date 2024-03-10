import {
    type ResumeShareCreateResponseDto,
    type ResumeShareGetResponseDto,
} from './types.js';

type IResumeShareService = {
    CreateShareLink(
        id: string,
    ): Promise<ResumeShareCreateResponseDto | unknown>;

    GetShareLink(
        id: string,
        ip: string,
    ): Promise<ResumeShareGetResponseDto | unknown>;
};

export { type IResumeShareService };
