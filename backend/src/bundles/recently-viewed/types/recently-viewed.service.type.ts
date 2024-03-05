import {
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
    type RecentlyViewedTemplatesResponseDto,
} from './types';

type IRecentlyViewedService = {
    findAll(data: { limit: number }): Promise<RecentlyViewedResponseDto[]>;

    findRecentlyViewedTemplatesByUser(data: {
        userId: string;
        limit: number;
    }): Promise<RecentlyViewedTemplatesResponseDto[]>;

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
};

export { type IRecentlyViewedService };
