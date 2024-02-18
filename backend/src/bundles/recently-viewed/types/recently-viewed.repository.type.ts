import {
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
} from './types';

type IRecentlyViewedRepository = {
    find(id: string): Promise<RecentlyViewedResponseDto | null>;

    findRecentlyViewedByUser(data: {
        userId: string;
        resumeId?: string;
        templateId?: string;
    }): Promise<RecentlyViewedResponseDto | null>;

    findAllRecentlyViewedResumes(data: {
        limit: number;
    }): Promise<RecentlyViewedResponseDto[]>;

    findAllRecentlyViewedTemplates(data: {
        limit: number;
    }): Promise<RecentlyViewedResponseDto[]>;

    create(data: RecentlyViewedRequestDto): Promise<RecentlyViewedResponseDto>;

    update(id: string): Promise<RecentlyViewedResponseDto | null>;

    delete(id: string): Promise<boolean>;
};

export { type IRecentlyViewedRepository };
