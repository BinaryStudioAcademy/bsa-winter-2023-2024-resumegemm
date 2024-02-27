import { type RecentlyViewedModel } from '../recently-viewed.model';

interface RecentlyViewedResumesQueryResult extends RecentlyViewedModel {
    count: number;
    resumes: {
        id: string;
        userId: string;
    };
}

export { type RecentlyViewedResumesQueryResult };
