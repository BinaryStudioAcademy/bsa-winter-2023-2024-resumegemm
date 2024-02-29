import { type RecentlyViewedRepository } from './recently-viewed.repository';
import {
    type IRecentlyViewedService,
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
    type RecentlyViewedResumesResponseDto,
    type RecentlyViewedTemplatesResponseDto,
} from './types/types';

class RecentlyViewedService implements IRecentlyViewedService {
    private recentlyViewedRepository: RecentlyViewedRepository;

    public constructor(recentViewedRepository: RecentlyViewedRepository) {
        this.recentlyViewedRepository = recentViewedRepository;
    }

    public async findAll(data: {
        limit: number;
    }): Promise<RecentlyViewedResponseDto[]> {
        return await this.recentlyViewedRepository.findAll(data);
    }

    public async findRecentlyViewedTemplatesByUser(data: {
        userId: string;
        limit: number;
    }): Promise<RecentlyViewedTemplatesResponseDto[]> {
        return await this.recentlyViewedRepository.findRecentlyViewedTemplatesByUser(
            data,
        );
    }

    public async findRecentlyViewedResumesByUser(data: {
        userId: string;
        limit: number;
    }): Promise<RecentlyViewedResumesResponseDto[]> {
        return await this.recentlyViewedRepository.findRecentlyViewedResumesByUser(
            data,
        );
    }

    public async create(
        userId: string,
        payload: RecentlyViewedRequestDto,
    ): Promise<RecentlyViewedResponseDto> {
        return await this.recentlyViewedRepository.create(userId, payload);
    }

    public async update(id: string): Promise<RecentlyViewedResponseDto | null> {
        const recentlyViewed = await this.recentlyViewedRepository.find(id);

        if (!recentlyViewed) {
            return null;
        }

        return await this.recentlyViewedRepository.update(id);
    }

    public async delete(id: string): Promise<boolean | null> {
        const recentlyViewed = await this.recentlyViewedRepository.find(id);

        if (!recentlyViewed) {
            return null;
        }

        return await this.recentlyViewedRepository.delete(id);
    }
}

export { RecentlyViewedService };
