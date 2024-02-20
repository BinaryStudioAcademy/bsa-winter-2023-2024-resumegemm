import { type TemplateEditRequestDto } from 'shared/build/bundles/templates/templates.js';
import { type HttpError } from 'shared/build/index.js';

import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { TemplateApiPath } from './enums/enums.js';
import { type TemplateService } from './template.service.js';

class TemplateController extends Controller {
    private templateService: TemplateService;

    public constructor(logger: ILogger, templateService: TemplateService) {
        super(logger, ApiPath.TEMPLATES);

        this.templateService = templateService;

        this.addRoute({
            path: TemplateApiPath.TEMPLATE_ID,
            method: 'PUT',
            handler: (options) =>
                this.updateTemplate(
                    options as ApiHandlerOptions<{
                        body: TemplateEditRequestDto;
                        params: {
                            id: string;
                        };
                    }>,
                ),
        });
    }

    private async updateTemplate(
        options: ApiHandlerOptions<{
            body: TemplateEditRequestDto;
            params: {
                id: string;
            };
        }>,
    ): Promise<ApiHandlerResponse<void>> {
        try {
            await this.templateService.updateTemplateSettings(
                options.params.id,
                options.body,
            );
            return {
                status: HttpCode.OK,
                payload: {},
            };
        } catch (error: unknown) {
            const { message, status } = error as HttpError;
            return {
                status,
                payload: {
                    message,
                    status,
                },
            };
        }
    }
}

export { TemplateController };
