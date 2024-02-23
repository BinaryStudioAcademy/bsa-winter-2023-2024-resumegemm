import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import { IndustriesApiPath } from './enums/enums.js';
import { type Industry } from './type/types.js';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class IndustriesApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.INDUSTRIES, baseUrl, http, storage });
    }

    public async getAll(): Promise<Industry[]> {
        const response = await this.load(
            this.getFullEndpoint(IndustriesApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );

        return await response.json<Industry[]>();
    }
}

export { IndustriesApi };
