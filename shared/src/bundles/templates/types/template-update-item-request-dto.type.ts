import { type TemplateDto } from './template-dto.type.js';

type TemplateUpdateItemRequestDto = Pick<
    TemplateDto,
    'templateSettings' | 'name' | 'image'
>;

export { type TemplateUpdateItemRequestDto };
