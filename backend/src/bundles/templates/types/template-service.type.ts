import {
    type TemplateCreateItemRequestDto,
    type TemplateUpdateItemRequestDto,
} from 'shared/build';

interface ITemplateService<T> {
    find(id: number): Promise<T | undefined>;
    findAll(): Promise<{
        items: T[];
    }>;
    create(payload: TemplateCreateItemRequestDto): Promise<T>;
    update(id: number, data: TemplateUpdateItemRequestDto): Promise<T>;
    delete(id: number): Promise<boolean>;
}

export { type ITemplateService };
