import {
    type TemplateCreateItemRequestDto,
    type TemplateGetAllItemResponseDto,
    type TemplateUpdateItemRequestDto,
    type TemplateUpdateItemResponseDto,
} from 'shared/build/bundles/templates/templates.js';

import { type Template } from './template.type';

interface ITemplateService {
    find(id: string): Promise<Template | undefined>;
    findAll(): Promise<{
        items: TemplateGetAllItemResponseDto[];
    }>;
    create(payload: TemplateCreateItemRequestDto): Promise<Template>;
    update(
        id: string,
        data: TemplateUpdateItemRequestDto,
    ): Promise<TemplateUpdateItemResponseDto>;
    delete(id: string): Promise<boolean>;
}

export { type ITemplateService };
