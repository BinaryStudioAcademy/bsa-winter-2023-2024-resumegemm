import {
    type TemplateGetAllItemResponseDto,
    type TemplateUpdateItemRequestDto,
    type TemplateUpdateItemResponseDto,
} from 'shared/build/bundles/templates/templates.js';

import { type FindAllOptions } from './find-all-options.type';
import { type Template } from './template.type';

interface ITemplateService {
    find(id: string): Promise<Template | undefined>;
    findAll(options?: FindAllOptions): Promise<{
        items: TemplateGetAllItemResponseDto[];
    }>;
    create(payload: { userId: string }): Promise<Template>;
    update(
        id: string,
        data: TemplateUpdateItemRequestDto,
    ): Promise<TemplateUpdateItemResponseDto>;
    delete(id: string): Promise<boolean>;
}

export { type ITemplateService };
