import {
    type TemplateCreateItemRequestDto,
    type TemplateUpdateItemRequestDto,
} from 'shared/build/index.js';
import { TemplatesApiPath } from 'shared/build/index.js';

import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller.js';
import { Controller } from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { type Template } from './types/template.type.js';
import { type ITemplateService } from './types/template-service.type.js';

class TemplateController extends Controller {
    private templateService: ITemplateService<Template>;

    public constructor(
        logger: ILogger,
        templateService: ITemplateService<Template>,
    ) {
        super(logger, ApiPath.TEMPLATES);

        this.templateService = templateService;
        this.addRoute({
            path: TemplatesApiPath.ROOT,
            method: 'POST',
            handler: (options) =>
                this.create(options as ApiHandlerOptions<{ body: Template }>),
        });
        this.addRoute({
            path: TemplatesApiPath.ID,
            method: 'GET',
            handler: (options) =>
                this.findById(
                    options as ApiHandlerOptions<{ params: { id: number } }>,
                ),
        });
        this.addRoute({
            path: TemplatesApiPath.ROOT,
            method: 'GET',
            handler: () => this.findAll(),
        });
        this.addRoute({
            path: TemplatesApiPath.ID,
            method: 'DELETE',
            handler: (options) =>
                this.delete(
                    options as ApiHandlerOptions<{ params: { id: number } }>,
                ),
        });
        this.addRoute({
            path: TemplatesApiPath.ID,
            method: 'PUT',
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{
                        body: TemplateCreateItemRequestDto;
                        params: { id: number };
                    }>,
                ),
        });
    }

    private async create(
        options: ApiHandlerOptions<{ body: Template }>,
    ): Promise<ApiHandlerResponse> {
        const template = await this.templateService.create(options.body);
        return {
            status: HttpCode.CREATED,
            payload: template,
        };
    }

    private async findById(
        options: ApiHandlerOptions<{ params: { id: number } }>,
    ): Promise<ApiHandlerResponse> {
        const template = await this.templateService.find(options.params.id);
        return {
            status: HttpCode.OK,
            payload: template,
        };
    }

    private async findAll(): Promise<ApiHandlerResponse> {
        const templateList = await this.templateService.findAll();
        return {
            status: HttpCode.OK,
            payload: templateList,
        };
    }

    private async delete(
        options: ApiHandlerOptions<{ params: { id: number } }>,
    ): Promise<ApiHandlerResponse> {
        const isDeleted = await this.templateService.delete(options.params.id);
        return {
            status: HttpCode.OK,
            payload: isDeleted,
        };
    }

    private async update(
        options: ApiHandlerOptions<{
            body: TemplateUpdateItemRequestDto;
            params: { id: number };
        }>,
    ): Promise<ApiHandlerResponse> {
        const newTemplate = await this.templateService.update(
            options.params.id,
            options.body,
        );
        return {
            status: HttpCode.OK,
            payload: newTemplate,
        };
    }
}

export { TemplateController };
