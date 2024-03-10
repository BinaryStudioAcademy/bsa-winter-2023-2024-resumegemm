import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import { StatisticsApiPath } from './enums/enums';
import { type GetStatisticsResponseDto } from './types/types';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class StatisticsApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.STATISTICS, baseUrl, http, storage });
    }

    public async getStatistics(
        resumesId: string[],
        type: string,
    ): Promise<GetStatisticsResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(StatisticsApiPath.QUERY, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify({
                    resumeIds: resumesId,
                    type: type,
                }),
                hasAuth: true,
            },
        );

        return await response.json();
    }
}

export { StatisticsApi };
