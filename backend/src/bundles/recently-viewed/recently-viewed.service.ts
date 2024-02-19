import { type RecentlyViewedRepository } from './recently-viewed.repository';
import {
    type IRecentlyViewedService,
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
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

    public async findRecentlyViewedTemplates(data: {
        limit: number;
    }): Promise<RecentlyViewedResponseDto[]> {
        return await this.recentlyViewedRepository.findAllRecentlyViewedTemplates(
            data,
        );
    }

    public async findRecentlyViewedResumes(data: {
        limit: number;
    }): Promise<RecentlyViewedResponseDto[]> {
        return await this.recentlyViewedRepository.findAllRecentlyViewedResumes(
            data,
        );
    }

    public async create(
        payload: RecentlyViewedRequestDto,
    ): Promise<RecentlyViewedResponseDto> {
        return await this.recentlyViewedRepository.create(payload);
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
