import {
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
    type RecentlyViewedResumesWithCount,
} from './types';

type IRecentlyViewedService = {
    findAll(data: { limit: number }): Promise<RecentlyViewedResponseDto[]>;

    create(
        payload: RecentlyViewedRequestDto,
    ): Promise<RecentlyViewedResponseDto>;

    update(id: string): Promise<RecentlyViewedResponseDto | null>;

    delete(id: string): Promise<boolean | null>;

    findRecentlyViewedResumesWithCount(): Promise<
        RecentlyViewedResumesWithCount[]
    >;
};

export { type IRecentlyViewedService };
