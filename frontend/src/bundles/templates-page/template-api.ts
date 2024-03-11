import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import { TemplatesApiPath } from './enums/enums';
import {
    type TemplateDto,
    type TemplateUpdateItemRequestDto,
    type TemplateUpdateItemResponseDto,
} from './types/types';
import { type TemplateGetAllResponseDto } from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

type EditTemplatePayload = Partial<TemplateUpdateItemRequestDto>;

class TemplateApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.TEMPLATES, baseUrl, http, storage });
    }

    public async editTemplate(
        templateId: string,
        editedData: EditTemplatePayload,
    ): Promise<TemplateDto> {
        const response = await this.load(
            this.getFullEndpoint(`/${templateId}`, {}),
            {
                method: 'PUT',
                contentType: ContentType.JSON,
                payload: JSON.stringify(editedData),
                hasAuth: true,
            },
        );

        return await response.json();
    }

    public async getTemplateById(
        templateId: string,
    ): Promise<TemplateUpdateItemResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(`/${templateId}`, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json();
    }

    public async createTemplate(): Promise<TemplateDto> {
        const response = await this.load(
            this.getFullEndpoint(TemplatesApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify({}),
                hasAuth: true,
            },
        );

        return await response.json();
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

export { TemplateApi };
