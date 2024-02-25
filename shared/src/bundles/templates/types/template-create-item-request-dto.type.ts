import { type TemplateDto } from './template-dto.type';

type TemplateCreateItemRequestDto = Pick<
    TemplateDto,
    'isOwner' | 'userId' | 'templateSettings'
>;

export { type TemplateCreateItemRequestDto };
