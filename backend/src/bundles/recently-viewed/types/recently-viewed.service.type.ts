import {
    type RecentlyViewedQuery,
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
    type RecentlyViewedResumesWithCount,
} from './types';

interface IRecentlyViewedService {
    findAll(data: { limit: number }): Promise<RecentlyViewedResponseDto[]>;

    findRecentlyViewedTemplatesByUser(data: {
        userId: string;
        limit: number;
    }): Promise<RecentlyViewedResponseDto[] | null>;

    findRecentlyViewedResumesByUser(data: {
        userId: string;
        options: RecentlyViewedQuery;
    }): Promise<RecentlyViewedResponseDto[] | null>;

    create(
        userId: string,
        payload: RecentlyViewedRequestDto,
    ): Promise<RecentlyViewedResponseDto>;

    update(id: string): Promise<RecentlyViewedResponseDto | null>;

    delete(id: string): Promise<boolean | null>;

    findRecentlyViewedResumesWithCount(): Promise<
        RecentlyViewedResumesWithCount[]
    >;
}

export { type IRecentlyViewedService };
