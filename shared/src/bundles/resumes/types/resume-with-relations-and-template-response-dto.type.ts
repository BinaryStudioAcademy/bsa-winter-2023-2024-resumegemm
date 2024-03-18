import { type ResumeGetItemResponseDto } from '~/bundles/resumes/types/resume-get-item-response-dto.type.js';
import { type TemplateGetAllItemResponseDto } from '~/bundles/templates/types/template-get-all-item-response-dto.type.js';

type ResumeWithRelationsAndTemplateResponseDto = ResumeGetItemResponseDto & {
    templates: TemplateGetAllItemResponseDto;
};

export { type ResumeWithRelationsAndTemplateResponseDto };
