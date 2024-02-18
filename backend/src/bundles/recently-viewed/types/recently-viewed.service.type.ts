import {
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
} from './types';

type IRecentlyViewedService = {
    findRecentlyViewedTemplates(data: {
        limit: number;
    }): Promise<RecentlyViewedResponseDto[] | null>;

    findRecentlyViewedResumes(data: {
        limit: number;
    }): Promise<RecentlyViewedResponseDto[] | null>;

    create(
        payload: RecentlyViewedRequestDto,
    ): Promise<RecentlyViewedResponseDto>;

    update(id: string): Promise<RecentlyViewedResponseDto | null>;

    delete(id: string): Promise<boolean | null>;
};

export { type IRecentlyViewedService };
