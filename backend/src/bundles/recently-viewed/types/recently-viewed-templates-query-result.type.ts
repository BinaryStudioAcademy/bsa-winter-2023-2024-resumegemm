import { type RecentlyViewedModel } from '../recently-viewed.model';
import { type TemplateDto } from './types';

interface RecentlyViewedTemplatesQueryResult extends RecentlyViewedModel {
    templates: TemplateDto;
    resumes: {
        id: string;
        resumeTitle: string;
    };
}

export { type RecentlyViewedTemplatesQueryResult };
