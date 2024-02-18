import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller';

import { type RecentlyViewedRequestDto } from './types';

type IRecentlyViewedController = {
    findAll(options: { query: { limit: number } }): Promise<ApiHandlerResponse>;

    findRecentlyViewedResumes(options: {
        query: { limit: number };
    }): Promise<ApiHandlerResponse>;

    findRecentlyViewedTemplates(options: {
        query: { limit: number };
    }): Promise<ApiHandlerResponse>;

    create(
        options: ApiHandlerOptions<{ body: RecentlyViewedRequestDto }>,
    ): Promise<ApiHandlerResponse>;

    update(
        options: ApiHandlerOptions<{ params: { id: string } }>,
    ): Promise<ApiHandlerResponse>;

    delete(
        options: ApiHandlerOptions<{ params: { id: string } }>,
    ): Promise<ApiHandlerResponse>;
};

export { type IRecentlyViewedController };
