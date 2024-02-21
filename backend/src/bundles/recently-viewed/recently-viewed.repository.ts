import { type RecentlyViewedModel } from './recently-viewed.model';
import {
    type IRecentlyViewedRepository,
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
    type RecentlyViewedResumesQueryResult,
    type RecentlyViewedResumesWithCount,
} from './types/types';

class RecentlyViewedRepository implements IRecentlyViewedRepository {
    private recentlyViewedModel: typeof RecentlyViewedModel;

    public constructor(recentlyViewedModel: typeof RecentlyViewedModel) {
        this.recentlyViewedModel = recentlyViewedModel;
    }

    public async find(id: string): Promise<RecentlyViewedResponseDto | null> {
        const recentlyViewed = await this.recentlyViewedModel
            .query()
            .findById(id);

        return recentlyViewed ?? null;
    }

    public async findAll(data: {
        limit: number;
    }): Promise<RecentlyViewedResponseDto[]> {
        const { limit } = data;

        return await this.recentlyViewedModel
            .query()
            .whereNotNull('resumeId')
            .withGraphFetched('[resumes]')
            .orderBy('viewedAt', 'desc')
            .limit(limit);
    }

    public async create(
        data: RecentlyViewedRequestDto,
    ): Promise<RecentlyViewedResponseDto> {
        return await this.recentlyViewedModel
            .query()
            .insert(data)
            .returning('*')
            .execute();
    }

    public async update(id: string): Promise<RecentlyViewedResponseDto> {
        const newDate = {
            viewedAt: new Date().toISOString(),
        };

        return await this.recentlyViewedModel
            .query()
            .updateAndFetchById(id, newDate);
    }

    public async delete(id: string): Promise<boolean> {
        const deletedItem = await this.recentlyViewedModel
            .query()
            .deleteById(id);

        return deletedItem ? true : false;
    }

    public async findRecentlyViewedResumesWithCount(): Promise<
        RecentlyViewedResumesWithCount[]
    > {
        const currentDate = new Date();
        const startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            0,
            0,
            0,
        );
        const endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            23,
            59,
            59,
        );

        const result = (await this.recentlyViewedModel
            .query()
            .select('user_id', 'resume_id')
            .count('resume_id as count')
            .groupBy('user_id', 'resume_id')
            .whereNotNull('resume_id')
            .whereBetween('viewed_at', [
                startDate,
                endDate,
            ])) as RecentlyViewedResumesQueryResult[];

        return result.map((item) => {
            return {
                resumeId: item.resumeId,
                userId: item.userId,
                count: +item.count,
            };
        });
    }
}

export { RecentlyViewedRepository };
