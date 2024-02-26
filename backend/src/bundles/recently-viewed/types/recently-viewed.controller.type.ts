import { type UserAuthResponse } from '~/bundles/users/types/types';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller';

import {
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
    type RecentlyViewedResumesResponseDto,
    type RecentlyViewedTemplatesResponseDto,
} from './types';

type IRecentlyViewedController = {
    findAll(options: {
        query: { limit: number };
    }): Promise<ApiHandlerResponse<RecentlyViewedResponseDto[]>>;

    findRecentlyViewedResumes(options: {
        user: UserAuthResponse;
        query: { limit: number };
    }): Promise<ApiHandlerResponse<RecentlyViewedResumesResponseDto[]>>;

    findRecentlyViewedTemplates(options: {
        user: UserAuthResponse;
        query: { limit: number };
    }): Promise<ApiHandlerResponse<RecentlyViewedTemplatesResponseDto[]>>;

    create(
        options: ApiHandlerOptions<{
            user: UserAuthResponse;
            body: RecentlyViewedRequestDto;
        }>,
    ): Promise<ApiHandlerResponse<RecentlyViewedResponseDto>>;

    update(
        options: ApiHandlerOptions<{ params: { id: string } }>,
    ): Promise<ApiHandlerResponse<RecentlyViewedResponseDto>>;

    delete(
        options: ApiHandlerOptions<{ params: { id: string } }>,
    ): Promise<ApiHandlerResponse<boolean>>;
};

export { type IRecentlyViewedController };
