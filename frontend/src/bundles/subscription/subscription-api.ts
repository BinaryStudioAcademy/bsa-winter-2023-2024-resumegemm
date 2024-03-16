import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import { SubscriptionApiPath } from './enums/enums.js';
import { type SubscriptionResponseDto } from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class SubscriptionApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.SUBSCRIPTION, baseUrl, http, storage });
    }

    public async getById(id: string): Promise<SubscriptionResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(`${SubscriptionApiPath.ROOT}${id}`, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<SubscriptionResponseDto>();
    }
}

export { SubscriptionApi };
