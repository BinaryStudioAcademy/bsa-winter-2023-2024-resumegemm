import { type TemplateDto } from './template-dto.type.js';

type TemplateUpdateItemRequestDto = Pick<
    TemplateDto,
    'templateSettings' | 'name'
>;

export { type TemplateUpdateItemRequestDto };
