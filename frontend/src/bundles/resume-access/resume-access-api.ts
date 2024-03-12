import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import { ResumesApiPath } from './enums/enums';
import {
    type ResumeShareCreateResponseDto,
    type ResumeShareDeleteResponseDto,
    type ResumeShareDetailsGetResponseDto,
    type ResumeShareGetResponseDto,
} from './types/types';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class ResumeAccessApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.RESUMES, baseUrl, http, storage });
    }

    public async accessResume(
        resumeId: string,
    ): Promise<ResumeShareGetResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ResumesApiPath.SHARE_ID(resumeId), {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );

        return await response.json();
    }

    public async accessResumeDetails(
        resumeId: string,
    ): Promise<ResumeShareDetailsGetResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ResumesApiPath.SHARE_ID_DETAILS(resumeId), {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json();
    }

    public async deleteResumeAccess(
        resumeId: string,
    ): Promise<ResumeShareDeleteResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ResumesApiPath.SHARE_ID(resumeId), {}),
            {
                method: 'DELETE',
                contentType: ContentType.JSON,
                payload: JSON.stringify({}),
                hasAuth: true,
            },
        );

        return await response.json();
    }

    public async createResumeAccess(
        resumeId: string,
    ): Promise<ResumeShareCreateResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ResumesApiPath.ID_SHARE(resumeId), {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify({}),
                hasAuth: true,
            },
        );

        return await response.json();
    }

    public async getResumeShareLinkByResumeId(
        resumeId: string,
    ): Promise<ResumeShareCreateResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ResumesApiPath.SHARE_RESUME_ID(resumeId), {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json();
    }
}

export { ResumeAccessApi };
