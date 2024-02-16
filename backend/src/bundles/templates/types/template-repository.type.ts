import {
    type TemplateCreateItemRequestDto,
    type TemplateGetAllItemResponseDto,
    type TemplateGetAllResponseDto,
    type TemplateUpdateItemRequestDto,
} from 'shared/build';

interface ITemplateRepository {
    find(id: number): Promise<TemplateGetAllItemResponseDto | undefined>;
    findAll(): Promise<TemplateGetAllResponseDto>;
    create(
        payload: TemplateCreateItemRequestDto,
    ): Promise<TemplateGetAllItemResponseDto>;
    update(
        id: number,
        data: TemplateUpdateItemRequestDto,
    ): Promise<TemplateGetAllItemResponseDto>;
    delete(id: number): Promise<boolean>;
}

export { type ITemplateRepository };
