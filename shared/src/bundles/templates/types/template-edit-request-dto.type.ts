import { type TemplateDto } from './template-dto.type.js';

type TemplateEditRequestDto = Pick<TemplateDto, 'templateSettings'>;

export { type TemplateEditRequestDto };
