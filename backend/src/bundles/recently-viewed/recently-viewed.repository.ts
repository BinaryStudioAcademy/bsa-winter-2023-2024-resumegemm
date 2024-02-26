import { Guid as guid } from 'guid-typescript';

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
        const newRecentlyViewed = { ...data, id: guid.raw() };

        return await this.recentlyViewedModel
            .query()
            .insert(newRecentlyViewed)
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
        const interval = '1 day';
        const result = (await this.recentlyViewedModel
            .query()
            .select('user_id', 'resume_id', 'viewed_at')
            .count('resume_id as count')
            .groupBy('user_id', 'resume_id', 'viewed_at')
            .whereNotNull('resume_id')
            .withGraphFetched('resumes')
            .whereRaw(
                `viewed_at >= CURRENT_TIMESTAMP - interval '${interval}' AND viewed_at <= CURRENT_TIMESTAMP`,
            )) as RecentlyViewedResumesQueryResult[];

        return result.map((item) => {
            return {
                resumeId: item.resumes.id,
                userId: item.resumes.userId,
                count: +item.count,
            };
        });
    }
}

export { RecentlyViewedRepository };
