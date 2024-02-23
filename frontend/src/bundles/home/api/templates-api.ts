import {
    type IHttp,
    type IStorage,
    type TemplateGetAllResponseDto,
} from 'shared/build';
import { ApiPath, ContentType, TemplatesApiPath } from 'shared/build';

import { HttpApi } from '~/framework/api/http-api';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class TemplatesApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.TEMPLATES, baseUrl, http, storage });
    }

    public async getAll(): Promise<TemplateGetAllResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(TemplatesApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<TemplateGetAllResponseDto>();
    }
}

export { TemplatesApi };
