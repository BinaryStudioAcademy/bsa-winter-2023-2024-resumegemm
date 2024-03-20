import { type FindAllOptions } from 'shared/build/index.js';

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

    public async delete(templateId: string): Promise<boolean> {
        const response = await this.load(
            this.getFullEndpoint(`${TemplatesApiPath.ROOT}${templateId}`, {}),
            {
                method: 'DELETE',
                contentType: ContentType.JSON,
                hasAuth: true,
                payload: JSON.stringify({}),
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

    public async getAll(
        options: FindAllOptions,
    ): Promise<TemplateGetAllResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(
                this.getFindAllEndpoint(TemplatesApiPath.ROOT, options),
                {},
            ),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<TemplateGetAllResponseDto>();
    }

    //TODO this is stub since there is no time to handle this problem properly please ignore it
    private getFindAllEndpoint(
        baseUrl: string,
        parameters: FindAllOptions,
    ): string {
        let endpoint = baseUrl;

        if (parameters.name) {
            endpoint += `?name=${parameters.name}`;
        }

        if (parameters.direction) {
            endpoint += `${parameters.name ? '&' : '?'}direction=${
                parameters.direction
            }`;
        }

        return endpoint;
    }
}

export { TemplateApi };
