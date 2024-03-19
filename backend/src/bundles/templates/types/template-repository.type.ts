import {
    type TemplateCreateItemRequestDto,
    type TemplateGetAllItemResponseDto,
    type TemplateGetAllResponseDto,
    type TemplateUpdateItemRequestDto,
    type TemplateUpdateItemResponseDto,
} from 'shared/build/bundles/templates/templates.js';

import { type FindAllOptions } from './find-all-options.type';

interface ITemplateRepository {
    find(id: string): Promise<TemplateGetAllItemResponseDto | undefined>;
    findAll(options?: FindAllOptions): Promise<TemplateGetAllResponseDto>;
    create(
        payload: TemplateCreateItemRequestDto,
    ): Promise<TemplateGetAllItemResponseDto>;
    update(
        id: string,
        data: TemplateUpdateItemRequestDto,
    ): Promise<TemplateUpdateItemResponseDto>;
    delete(id: string): Promise<boolean>;
}

export { type ITemplateRepository };
