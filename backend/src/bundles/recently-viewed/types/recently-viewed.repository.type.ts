import {
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
    type RecentlyViewedTemplatesResponseDto,
} from './types';

type IRecentlyViewedRepository = {
    find(id: string): Promise<RecentlyViewedResponseDto | null>;

    findAll(data: { limit: number }): Promise<RecentlyViewedResponseDto[]>;

    findRecentlyViewedResumesByUser(data: {
        userId: string;
        limit: number;
    }): Promise<RecentlyViewedResponseDto[]>;

    findRecentlyViewedTemplatesByUser(data: {
        userId: string;
        limit: number;
    }): Promise<RecentlyViewedTemplatesResponseDto[]>;

    create(
        userId: string,
        data: RecentlyViewedRequestDto,
    ): Promise<RecentlyViewedResponseDto>;

    update(id: string): Promise<RecentlyViewedResponseDto | null>;

    delete(id: string): Promise<boolean>;
};

export { type IRecentlyViewedRepository };
