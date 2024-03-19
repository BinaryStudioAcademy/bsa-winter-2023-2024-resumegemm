import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import { TEMPLATES_LIMIT } from './constants/template-limit.js';
import { RecentlyViewedApiPath } from './enums/enums.js';
import { type RecentlyViewedTemplatesResponseDto } from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class RecentlyViewedApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.RECENTLY_VIEWED, baseUrl, http, storage });
    }

    public async getRecentlyViewedTemplates(
        limit = TEMPLATES_LIMIT,
    ): Promise<RecentlyViewedTemplatesResponseDto[]> {
        const query = `limit=${limit}`;
        const response = await this.load(
            this.getFullEndpoint(
                `${RecentlyViewedApiPath.RECENTLY_VIEWED_TEMPLATES}?${query}`,
                {},
            ),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<RecentlyViewedTemplatesResponseDto[]>();
    }
}

export { RecentlyViewedApi };
