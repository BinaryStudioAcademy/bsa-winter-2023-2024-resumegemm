import { HttpApi } from '~/framework/api/api.js';

import { ApiPath, ContentType, ResumesApiPath } from './enums/enums';
import {
    type IHttp,
    type IStorage,
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
    type ResumeGetAllResponseDto,
    type ResumeViewsCountResponseDto,
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

    public async updateResume(
        payload: Omit<
            ResumeWithRelationsAndTemplateResponseDto,
            'templates'
        > & { resume: object },
        resumeId: string,
    ): Promise<ResumeWithRelationsAndTemplateResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(`${ResumesApiPath.ROOT}${resumeId}`, {}),
            {
                method: 'PUT',
                contentType: ContentType.JSON,
                hasAuth: true,
                payload: JSON.stringify(payload),
            },
        );
        return await response.json<ResumeWithRelationsAndTemplateResponseDto>();
    }

    public async createResume(
        payload: Partial<ResumeWithRelationsAndTemplateResponseDto>,
        templateId: string,
    ): Promise<ResumeGetAllResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(`${ResumesApiPath.ROOT}${templateId}`, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                hasAuth: true,
                payload: JSON.stringify(payload),
            },
        );
        return await response.json<ResumeGetAllResponseDto>();
    }

    public async deleteResume(
        resumeId: string,
    ): Promise<ResumeGetAllResponseDto[]> {
        const response = await this.load(
            this.getFullEndpoint(`${ResumesApiPath.ROOT}${resumeId}`, {}),
            {
                method: 'DELETE',
                contentType: ContentType.JSON,
                hasAuth: true,
                payload: JSON.stringify({}),
            },
        );
        return await response.json<ResumeGetAllResponseDto[]>();
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

    public async getViewsCount(): Promise<ResumeViewsCountResponseDto[]> {
        const response = await this.load(
            this.getFullEndpoint(ResumesApiPath.VIEWS, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json();
    }
}

export { ResumeApi };
