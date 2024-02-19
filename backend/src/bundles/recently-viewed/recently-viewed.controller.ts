import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { RecentlyViewedApiPath } from './enums/enums.js';
import { type RecentlyViewedService } from './recently-viewed.service';
import {
    type IRecentlyViewedController,
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
} from './types/types';

class RecentlyViewedController
    extends Controller
    implements IRecentlyViewedController
{
    private recentlyViewedService: RecentlyViewedService;

    public constructor(
        logger: ILogger,
        recentlyViewedService: RecentlyViewedService,
    ) {
        super(logger, ApiPath.RECENTLY_VIEWED);
        this.recentlyViewedService = recentlyViewedService;
        this.addRoute({
            path: RecentlyViewedApiPath.ROOT,
            method: 'GET',
            handler: (options) =>
                this.findAll(
                    options as ApiHandlerOptions<{ query: { limit: number } }>,
                ),
        });
        this.addRoute({
            path: RecentlyViewedApiPath.RECENTLY_VIEWED_RESUMES,
            method: 'GET',
            handler: (options) =>
                this.findRecentlyViewedResumes(
                    options as ApiHandlerOptions<{ query: { limit: number } }>,
                ),
        });
        this.addRoute({
            path: RecentlyViewedApiPath.RECENTLY_VIEWED_TEMPLATES,
            method: 'GET',
            handler: (options) =>
                this.findRecentlyViewedTemplates(
                    options as ApiHandlerOptions<{ query: { limit: number } }>,
                ),
        });
        this.addRoute({
            path: RecentlyViewedApiPath.ROOT,
            method: 'POST',
            handler: (options) =>
                this.create(
                    options as ApiHandlerOptions<{
                        body: RecentlyViewedRequestDto;
                    }>,
                ),
        });
        this.addRoute({
            path: RecentlyViewedApiPath.ID,
            method: 'PUT',
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{ params: { id: string } }>,
                ),
        });
        this.addRoute({
            path: RecentlyViewedApiPath.ID,
            method: 'DELETE',
            handler: (options) =>
                this.delete(
                    options as ApiHandlerOptions<{ params: { id: string } }>,
                ),
        });
    }

    public async findAll(
        options: ApiHandlerOptions<{ query: { limit: number } }>,
    ): Promise<ApiHandlerResponse<RecentlyViewedResponseDto[]>> {
        try {
            const limit = options.query.limit;
            const items = await this.recentlyViewedService.findAll({
                limit,
            });

            return {
                status: HttpCode.OK,
                payload: items,
            };
        } catch (error) {
            return {
                status: HttpCode.INTERNAL_SERVER_ERROR,
                payload: {
                    message: (error as Error).message,
                },
            };
        }
    }

    public async findRecentlyViewedResumes(
        options: ApiHandlerOptions<{ query: { limit: number } }>,
    ): Promise<ApiHandlerResponse<RecentlyViewedResponseDto[]>> {
        try {
            const limit = options.query.limit;
            const recentlyViewedResumes =
                await this.recentlyViewedService.findRecentlyViewedResumes({
                    limit,
                });

            return {
                status: HttpCode.OK,
                payload: recentlyViewedResumes,
            };
        } catch (error) {
            return {
                status: HttpCode.INTERNAL_SERVER_ERROR,
                payload: {
                    message: (error as Error).message,
                },
            };
        }
    }

    public async findRecentlyViewedTemplates(
        options: ApiHandlerOptions<{ query: { limit: number } }>,
    ): Promise<ApiHandlerResponse<RecentlyViewedResponseDto[]>> {
        try {
            const limit = options.query.limit;
            const recentlyViewedTemplates =
                await this.recentlyViewedService.findRecentlyViewedTemplates({
                    limit,
                });

            return {
                status: HttpCode.OK,
                payload: recentlyViewedTemplates,
            };
        } catch (error) {
            return {
                status: HttpCode.INTERNAL_SERVER_ERROR,
                payload: {
                    message: (error as Error).message,
                },
            };
        }
    }

    public async create(
        options: ApiHandlerOptions<{ body: RecentlyViewedRequestDto }>,
    ): Promise<ApiHandlerResponse<RecentlyViewedResponseDto>> {
        try {
            const data = options.body;
            const createdItem = await this.recentlyViewedService.create(data);

            return {
                status: HttpCode.CREATED,
                payload: createdItem,
            };
        } catch (error) {
            return {
                status: HttpCode.INTERNAL_SERVER_ERROR,
                payload: {
                    message: (error as Error).message,
                },
            };
        }
    }

    public async update(
        options: ApiHandlerOptions<{ params: { id: string } }>,
    ): Promise<ApiHandlerResponse<RecentlyViewedResponseDto>> {
        try {
            const id = options.params.id;
            const updatedRecentlyViewed =
                await this.recentlyViewedService.update(id);

            if (!updatedRecentlyViewed) {
                return {
                    status: HttpCode.NOT_FOUND,
                    payload: { message: 'Not found' },
                };
            }
            return {
                status: HttpCode.OK,
                payload: updatedRecentlyViewed,
            };
        } catch (error) {
            return {
                status: HttpCode.INTERNAL_SERVER_ERROR,
                payload: { message: (error as Error).message },
            };
        }
    }

    public async delete(
        options: ApiHandlerOptions<{ params: { id: string } }>,
    ): Promise<ApiHandlerResponse<boolean>> {
        try {
            const id = options.params.id;
            const deletedItem = await this.recentlyViewedService.delete(id);

            if (!deletedItem) {
                return {
                    status: HttpCode.NOT_FOUND,
                    payload: { message: 'Not found' },
                };
            }
            return {
                status: HttpCode.OK,
                payload: true,
            };
        } catch (error) {
            return {
                status: HttpCode.INTERNAL_SERVER_ERROR,
                payload: { message: (error as Error).message },
            };
        }
    }
}

export { RecentlyViewedController };
