import { type TemplateResponseDto } from './types';

type TemplateEntityFields = Omit<
    TemplateResponseDto,
    'createdAt' | 'updatedAt' | 'deletedAt'
>;

export { type TemplateEntityFields };
