import {
    type TemplateCreateItemRequestDto,
    type TemplateGetAllItemResponseDto,
    type TemplateGetAllResponseDto,
    type TemplateUpdateItemRequestDto,
} from 'shared/build';

interface ITemplateRepository {
    find(id: string): Promise<TemplateGetAllItemResponseDto | undefined>;
    findAll(): Promise<TemplateGetAllResponseDto>;
    create(
        payload: TemplateCreateItemRequestDto,
    ): Promise<TemplateGetAllItemResponseDto>;
    update(
        id: string,
        data: TemplateUpdateItemRequestDto,
    ): Promise<TemplateGetAllItemResponseDto>;
    delete(id: string): Promise<boolean>;
}

export { type ITemplateRepository };
