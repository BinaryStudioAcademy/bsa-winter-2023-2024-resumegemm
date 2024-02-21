import {
    type TemplateEditRequestDto,
    type TemplateEditResponseDto,
} from 'shared/build/bundles/templates/templates.js';
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
import { type ITemplateService } from './types/types.js';

class TemplateController extends Controller {
    private templateService: ITemplateService;

    public constructor(
        logger: ILogger,
        templateService: ITemplateService,
    ) {
        super(logger, ApiPath.TEMPLATES);

        this.templateService = templateService;

        this.addRoute({
            path: TemplateApiPath.TEMPLATE_ID,
            method: 'PUT',
            handler: (options) =>
                this.editTemplate(
                    options as ApiHandlerOptions<{
                        body: TemplateEditRequestDto;
                        params: {
                            id: string;
                        };
                    }>,
                ),
        });
    }

    private async editTemplate(
        options: ApiHandlerOptions<{
            body: TemplateEditRequestDto;
            params: {
                id: string;
            };
        }>,
    ): Promise<ApiHandlerResponse<TemplateEditResponseDto>> {
        try {
            await this.templateService.editTemplateSettings(
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
