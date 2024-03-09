import { type Resume } from 'shared/build/index.js';

import { type RecentlyViewedModel } from '../recently-viewed.model';

interface RecentlyViewedResumesQueryResult extends RecentlyViewedModel {
    count: number;
    resumes: Resume;
}

export { type RecentlyViewedResumesQueryResult };
