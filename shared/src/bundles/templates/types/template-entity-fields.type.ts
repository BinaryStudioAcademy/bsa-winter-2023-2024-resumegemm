import { type TemplateResponse } from './types';

type TemplateEntityFields = Omit<TemplateResponse, 'createdAt' | 'updatedAt' | 'deletedAt'>;

export { type TemplateEntityFields };