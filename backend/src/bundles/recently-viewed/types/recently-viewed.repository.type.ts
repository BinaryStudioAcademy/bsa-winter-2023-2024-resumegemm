import {
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
} from './types';

type IRecentlyViewedRepository = {
    find(id: string): Promise<RecentlyViewedResponseDto | null>;

    findAll(data: { limit: number }): Promise<RecentlyViewedResponseDto[]>;

    create(data: RecentlyViewedRequestDto): Promise<RecentlyViewedResponseDto>;

    update(id: string): Promise<RecentlyViewedResponseDto | null>;

    delete(id: string): Promise<boolean>;
};

export { type IRecentlyViewedRepository };
