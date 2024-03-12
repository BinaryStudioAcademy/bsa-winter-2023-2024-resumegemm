import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import { ResumesApiPath } from './enums/enums.js';
import {
    type ResumeGetAllRequestDto,
    type ResumeGetAllResponseDto,
} from './types/types.js';

type ResumeApiConfig = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class ResumeApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: ResumeApiConfig) {
        super({ path: ApiPath.RESUMES, baseUrl, http, storage });
    }

    public async getAllByUserId(
        request: ResumeGetAllRequestDto,
    ): Promise<ResumeGetAllResponseDto> {
        const userIdPath = ResumesApiPath.USER_ID.replace(
            ':userId',
            request.userId,
        );
        const response = await this.load(
            this.getFullEndpoint(`${userIdPath}`, {}),
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
