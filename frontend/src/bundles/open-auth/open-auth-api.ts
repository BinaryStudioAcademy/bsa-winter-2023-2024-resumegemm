import {
    ApiPath,
    ContentType,
    OpenAuthApiPath,
} from '~/bundles/common/enums/enums.js';
import { type OauthUserLoginResponseDto } from '~/bundles/users/users.js';
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

    public async getOauthUser(): Promise<OauthUserLoginResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(OpenAuthApiPath.USER, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<OauthUserLoginResponseDto>();
    }
}

export { OpenAuthApi };
