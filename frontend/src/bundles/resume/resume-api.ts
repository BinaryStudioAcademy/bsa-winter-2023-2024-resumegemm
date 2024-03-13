import { HttpApi } from '~/framework/api/api.js';

import { ApiPath, ContentType, ResumesApiPath } from './enums/enums';
import {
    type IHttp,
    type IStorage,
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
    type ResumeGetAllResponseDto,
    type ResumeWithRelationsAndTemplateResponseDto,
} from './types/types';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class ResumeApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.RESUMES, baseUrl, http, storage });
    }

    public async getAllResumes(): Promise<ResumeGetAllResponseDto[]> {
        const response = await this.load(
            this.getFullEndpoint(ResumesApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<ResumeGetAllResponseDto[]>();
    }

    public async getOneWithTemplate(
        resumeId: string,
    ): Promise<ResumeWithRelationsAndTemplateResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(`${ResumesApiPath.ROOT}${resumeId}`, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<ResumeWithRelationsAndTemplateResponseDto>();
    }

    public async requestResumeReviewFromAI(
        resume: ResumeAiScoreRequestDto,
    ): Promise<ResumeAiScoreResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(`${ResumesApiPath.SCORE}`, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                hasAuth: true,
                payload: JSON.stringify(resume),
            },
        );
        return await response.json<ResumeAiScoreResponseDto>();
    }
}

export { ResumeApi };
