import { type FindAllOptions } from 'shared/build/index.js';

import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import { RecentlyViewedApiPath } from './common/enums/enums.js';
import { RESUMES_LIMIT } from './common/resumes-limit.js';
import { type RecentlyViewedResumesResponseDto } from './common/types/types.js';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class RecentlyViewedApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.RECENTLY_VIEWED, baseUrl, http, storage });
    }

    public async getRecentlyViewedResumes(
        limit = RESUMES_LIMIT,
        query: FindAllOptions,
    ): Promise<RecentlyViewedResumesResponseDto[]> {
        const { name, direction } = query;
        const options = `?limit=${limit}&name=${name}&direction=${direction}`;
        const response = await this.load(
            this.getFullEndpoint(
                `${RecentlyViewedApiPath.RECENTLY_VIEWED_RESUMES}${options}`,
                {},
            ),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<RecentlyViewedResumesResponseDto[]>();
    }
}

export { RecentlyViewedApi };
