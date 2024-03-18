import { ApiPath, ContentType, PDFApiPath } from 'shared/build';

import { HttpApi } from '~/framework/api/http-api';

import {
    type GeneratePdfRequestDto,
    type GeneratePdfResponseDto,
    type IHttp,
    type IStorage,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class PDFApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.PDF, baseUrl, http, storage });
    }

    public async generatePDFFileFromHTMLString(
        html: GeneratePdfRequestDto,
    ): GeneratePdfResponseDto {
        const response = await this.load(
            this.getFullEndpoint(`${PDFApiPath.GENERATE}`, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                hasAuth: true,
                payload: JSON.stringify(html),
            },
        );
        return await response.blob();
    }
}

export { PDFApi };
