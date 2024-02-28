import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import { ResumesApiPath } from './enums/enums';
import { type ResumeShareGetResponseDto } from './types/types';

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
}

export { ResumeAccessApi };
