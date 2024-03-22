import { type Resume } from 'shared/build/index.js';

import { type RecentlyViewedModel } from '../recently-viewed.model';

interface getResumesViewedByUserQueryResult extends RecentlyViewedModel {
    resumes: Resume;
}

export { type getResumesViewedByUserQueryResult };
