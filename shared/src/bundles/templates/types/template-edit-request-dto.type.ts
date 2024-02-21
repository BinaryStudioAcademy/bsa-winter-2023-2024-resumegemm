import { type TemplateResponseDto } from './template-response-dto.type.js';

type TemplateEditRequestDto = Omit<
    TemplateResponseDto, 'id' |
    'isOwner' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export { type TemplateEditRequestDto };
