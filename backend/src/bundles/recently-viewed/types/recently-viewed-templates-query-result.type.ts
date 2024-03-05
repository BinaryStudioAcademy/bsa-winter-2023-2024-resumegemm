import { type Resume } from '../../resumes/types/types';
import { type RecentlyViewedModel } from '../recently-viewed.model';
import { type TemplateDto } from './types';

interface RecentlyViewedTemplatesQueryResult extends RecentlyViewedModel {
    templates: TemplateDto;
    resumes: Resume;
}

export { type RecentlyViewedTemplatesQueryResult };
