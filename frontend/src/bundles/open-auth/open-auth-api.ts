import { ApiPath } from '~/bundles/common/enums/enums.js';
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
}

export { OpenAuthApi };
