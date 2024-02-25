import {
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
} from './types';

type IRecentlyViewedService = {
    findAll(data: { limit: number }): Promise<RecentlyViewedResponseDto[]>;

    create(
        payload: RecentlyViewedRequestDto,
    ): Promise<RecentlyViewedResponseDto>;

    update(id: string): Promise<RecentlyViewedResponseDto | null>;

    delete(id: string): Promise<boolean | null>;
};

export { type IRecentlyViewedService };
