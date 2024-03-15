import {
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
    type RecentlyViewedResumesWithCount,
} from './types';

interface IRecentlyViewedService {
    findAll(data: { limit: number }): Promise<RecentlyViewedResponseDto[]>;

    findRecentlyViewedTemplatesByUser(data: {
        userId: string;
        limit: number;
    }): Promise<RecentlyViewedResponseDto[]>;

    findRecentlyViewedResumesByUser(data: {
        userId: string;
        limit: number;
    }): Promise<RecentlyViewedResponseDto[]>;

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
