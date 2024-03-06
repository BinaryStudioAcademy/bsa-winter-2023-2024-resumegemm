import {
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
} from './types';

interface IRecentlyViewedRepository {
    find(id: string): Promise<RecentlyViewedResponseDto | null>;

    findAll(data: { limit: number }): Promise<RecentlyViewedResponseDto[]>;

    findRecentlyViewedResumesByUser(data: {
        userId: string;
        limit: number;
    }): Promise<RecentlyViewedResponseDto[]>;

    findRecentlyViewedTemplatesByUser(data: {
        userId: string;
        limit: number;
    }): Promise<RecentlyViewedResponseDto[]>;

    create(
        userId: string,
        data: RecentlyViewedRequestDto,
    ): Promise<RecentlyViewedResponseDto>;

    update(id: string): Promise<RecentlyViewedResponseDto | null>;

    delete(id: string): Promise<boolean>;
}

export { type IRecentlyViewedRepository };
