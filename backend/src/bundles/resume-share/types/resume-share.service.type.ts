import {
    type ResumeShareCreateResponseDto,
    // type ResumeShareGetResponseDto,
} from './types.js';

type IResumeShareService = {
    createShareLink(
        id: string,
    ): Promise<ResumeShareCreateResponseDto | unknown>;

    // getShareLink(
    //     id: string,
    //     ip: string,
    // ): Promise<ResumeShareGetResponseDto | unknown>;
};

export { type IResumeShareService };
