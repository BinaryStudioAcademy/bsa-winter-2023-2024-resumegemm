import { type TemplateDto } from './template-dto.type';

type TemplateCreateItemRequestDto = Pick<
    TemplateDto,
    'isOwner' | 'userId' | 'templateSettings' | 'image'
>;

export { type TemplateCreateItemRequestDto };
