import { type IdParameter } from 'shared/build';

import { type User } from '~/bundles/users/types/types';
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
    type RecentlyViewedQuery,
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
    type RecentlyViewedResumesResponseDto,
    type RecentlyViewedTemplatesResponseDto,
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
                    options as ApiHandlerOptions<{
                        user: User;
                        query: RecentlyViewedQuery;
                    }>,
                ),
        });
        this.addRoute({
            path: RecentlyViewedApiPath.RECENTLY_VIEWED_TEMPLATES,
            method: 'GET',
            handler: (options) =>
                this.findRecentlyViewedTemplates(
                    options as ApiHandlerOptions<{
                        user: User;
                        query: { limit: number };
                    }>,
                ),
        });
        this.addRoute({
            path: RecentlyViewedApiPath.ROOT,
            method: 'POST',
            handler: (options) =>
                this.create(
                    options as ApiHandlerOptions<{
                        user: User;
                        body: RecentlyViewedRequestDto;
                    }>,
                ),
        });
        this.addRoute({
            path: RecentlyViewedApiPath.ID,
            method: 'PUT',
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{ params: IdParameter }>,
                ),
        });
        this.addRoute({
            path: RecentlyViewedApiPath.ID,
            method: 'DELETE',
            handler: (options) =>
                this.delete(
                    options as ApiHandlerOptions<{ params: IdParameter }>,
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
        options: ApiHandlerOptions<{
            user: User;
            query: RecentlyViewedQuery;
        }>,
    ): Promise<ApiHandlerResponse<RecentlyViewedResumesResponseDto[]>> {
        try {
            const { query, user } = options;
            const { id: userId } = user;
            const recentlyViewedResumes =
                await this.recentlyViewedService.findRecentlyViewedResumesByUser(
                    {
                        userId,
                        options: query,
                    },
                );

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
        options: ApiHandlerOptions<{
            user: User;
            query: { limit: number };
        }>,
    ): Promise<ApiHandlerResponse<RecentlyViewedTemplatesResponseDto[]>> {
        try {
            const limit = options.query.limit;
            const userId = options.user.id;
            const recentlyViewedTemplates =
                await this.recentlyViewedService.findRecentlyViewedTemplatesByUser(
                    {
                        userId,
                        limit,
                    },
                );

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
        options: ApiHandlerOptions<{
            user: User;
            body: RecentlyViewedRequestDto;
        }>,
    ): Promise<ApiHandlerResponse<RecentlyViewedResponseDto>> {
        try {
            const data = options.body;
            const userId = options.user.id;
            const createdItem = await this.recentlyViewedService.create(
                userId,
                data,
            );

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
        options: ApiHandlerOptions<{ params: IdParameter }>,
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
        options: ApiHandlerOptions<{ params: IdParameter }>,
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
