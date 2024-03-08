import {
    ApiPath,
    ContentType,
    OpenAuthApiPath,
} from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class OpenAuthApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.OPEN_AUTH, baseUrl, http, storage });
    }

    public async disconnectSocialMedia(id: string): Promise<boolean> {
        const response = await this.load(
            this.getFullEndpoint(`${OpenAuthApiPath.ROOT}${id}`, {}),
            {
                method: 'DELETE',
                contentType: ContentType.JSON,
                hasAuth: true,
                payload: JSON.stringify({}),
            },
        );

        return await response.json<boolean>();
    }
}

export { OpenAuthApi };
