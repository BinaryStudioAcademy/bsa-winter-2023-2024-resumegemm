import {
    type TemplateGetAllResponseDto,
    type TemplateUpdateItemRequestDto,
    type TemplateUpdateItemResponseDto,
} from 'shared/build/bundles/templates/templates.js';
import { type IdParameter, HTTPError } from 'shared/build/index.js';

import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { type User } from '../users/types/types.js';
import { TemplateErrorMessage, TemplatesApiPath } from './enums/enums.js';
import {
    type FindAllOptions,
    type ITemplateService,
    type Template,
} from './types/types.js';

class TemplateController extends Controller {
    private templateService: ITemplateService;

    public constructor(logger: ILogger, templateService: ITemplateService) {
        super(logger, ApiPath.TEMPLATES);

        this.templateService = templateService;

        this.addRoute({
            path: TemplatesApiPath.ROOT,
            method: 'POST',
            handler: (options) =>
                this.create(
                    options as ApiHandlerOptions<{
                        user: User;
                    }>,
                ),
        });
        this.addRoute({
            path: TemplatesApiPath.TEMPLATE_ID,
            method: 'GET',
            handler: (options) =>
                this.findById(
                    options as ApiHandlerOptions<{ params: IdParameter }>,
                ),
        });
        this.addRoute({
            path: TemplatesApiPath.ROOT,
            method: 'GET',
            handler: (options) =>
                this.findAll(
                    options as ApiHandlerOptions<{
                        query: {
                            sortBy?: string;
                            filterByName?: string;
                        };
                    }>,
                ),
        });
        this.addRoute({
            path: TemplatesApiPath.TEMPLATE_ID,
            method: 'DELETE',
            handler: (options) =>
                this.delete(
                    options as ApiHandlerOptions<{ params: IdParameter }>,
                ),
        });
        this.addRoute({
            path: TemplatesApiPath.TEMPLATE_ID,
            method: 'PUT',
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{
                        body: TemplateUpdateItemRequestDto;
                        params: {
                            id: string;
                        };
                    }>,
                ),
        });
    }

    private async create(
        options: ApiHandlerOptions<{
            user: User;
        }>,
    ): Promise<ApiHandlerResponse<Template>> {
        const template = await this.templateService.create({
            userId: options.user.id,
        });
        return {
            status: HttpCode.CREATED,
            payload: template,
        };
    }

    private async findById(
        options: ApiHandlerOptions<{ params: IdParameter }>,
    ): Promise<ApiHandlerResponse<Template>> {
        const template = await this.templateService.find(options.params.id);
        if (!template) {
            throw new HTTPError({
                status: HttpCode.BAD_REQUEST,
                message: TemplateErrorMessage.TEMPLATE_NOT_FOUND,
            });
        }
        return {
            status: HttpCode.OK,
            payload: template,
        };
    }

    private async findAll(
        options: ApiHandlerOptions<{ query: FindAllOptions }>,
    ): Promise<ApiHandlerResponse<TemplateGetAllResponseDto>> {
        const templateList = await this.templateService.findAll(options.query);
        return {
            status: HttpCode.OK,
            payload: templateList,
        };
    }

    private async delete(
        options: ApiHandlerOptions<{ params: IdParameter }>,
    ): Promise<ApiHandlerResponse<boolean>> {
        const isDeleted = await this.templateService.delete(options.params.id);
        return {
            status: HttpCode.OK,
            payload: isDeleted,
        };
    }

    private async update(
        options: ApiHandlerOptions<{
            body: TemplateUpdateItemRequestDto;
            params: {
                id: string;
            };
        }>,
    ): Promise<ApiHandlerResponse<TemplateUpdateItemResponseDto>> {
        try {
            await this.templateService.update(options.params.id, options.body);
            return {
                status: HttpCode.OK,
                payload: {},
            };
        } catch (error: unknown) {
            const { message, status } = error as HTTPError;
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
