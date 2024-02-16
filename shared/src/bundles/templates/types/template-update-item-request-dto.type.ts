import { type TemplateGetAllItemResponseDto } from './template-get-all-item-response-dto.type.js';

type TemplateUpdateItemRequestDto = Partial<
    Omit<
        TemplateGetAllItemResponseDto,
        'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'userId' | 'resumeId'
    >
>;

export { type TemplateUpdateItemRequestDto };