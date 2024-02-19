import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller';

import { 
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto, 
} from './types';

type IRecentlyViewedController = {
    findAll(options: { query: { limit: number } }
        ): Promise<ApiHandlerResponse<RecentlyViewedResponseDto[]>>;

    findRecentlyViewedResumes(options: {
        query: { limit: number };
    }): Promise<ApiHandlerResponse<RecentlyViewedResponseDto[]>>;

    findRecentlyViewedTemplates(options: {
        query: { limit: number };
    }): Promise<ApiHandlerResponse<RecentlyViewedResponseDto[]>>;

    create(
        options: ApiHandlerOptions<{ body: RecentlyViewedRequestDto }>,
    ): Promise<ApiHandlerResponse<RecentlyViewedResponseDto>>;

    update(
        options: ApiHandlerOptions<{ params: { id: string } }>,
    ): Promise<ApiHandlerResponse<RecentlyViewedResponseDto>>;

    delete(
        options: ApiHandlerOptions<{ params: { id: string } }>,
    ): Promise<ApiHandlerResponse<boolean>>;
};

export { type IRecentlyViewedController };
