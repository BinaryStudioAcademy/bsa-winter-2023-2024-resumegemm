import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import {
    type TemplateEditRequestDto,
    type TemplateEditResponseDto,
} from './types/types';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

type UpdateTemplatePayload = Partial<TemplateEditRequestDto>;

class TemplateApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.TEMPLATES, baseUrl, http, storage });
    }

    public async editTemplate(
        templateId: string,
        updatedData: UpdateTemplatePayload,
    ): Promise<TemplateEditResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(`/${templateId}`, {}),
            {
                method: 'PUT',
                contentType: ContentType.JSON,
                payload: JSON.stringify(updatedData),
                hasAuth: false,
            },
        );

        return await response.json();
    }
}

export { TemplateApi };
