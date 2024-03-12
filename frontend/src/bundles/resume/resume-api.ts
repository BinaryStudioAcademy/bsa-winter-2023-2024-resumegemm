import { HttpApi } from '~/framework/api/api.js';

import { ApiPath, ContentType, ResumesApiPath } from './enums/enums';
import {
    type IHttp,
    type IStorage,
    type ResumeGetAllResponseDto,
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
}

export { ResumeApi };
