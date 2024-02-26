import {
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
    type RecentlyViewedResumesWithCount,
} from './types';

type IRecentlyViewedRepository = {
    find(id: string): Promise<RecentlyViewedResponseDto | null>;

    findAll(data: { limit: number }): Promise<RecentlyViewedResponseDto[]>;

    create(data: RecentlyViewedRequestDto): Promise<RecentlyViewedResponseDto>;

    update(id: string): Promise<RecentlyViewedResponseDto | null>;

    delete(id: string): Promise<boolean>;

    findRecentlyViewedResumesWithCount(): Promise<
        RecentlyViewedResumesWithCount[]
    >;
};

export { type IRecentlyViewedRepository };
