import {
    type TemplateCreateItemRequestDto,
    type TemplateUpdateItemRequestDto,
} from 'shared/build';

interface ITemplateService<T> {
    find(id: string): Promise<T | undefined>;
    findAll(): Promise<{
        items: T[];
    }>;
    create(payload: TemplateCreateItemRequestDto): Promise<T>;
    update(id: string, data: TemplateUpdateItemRequestDto): Promise<T>;
    delete(id: string): Promise<boolean>;
}

export { type ITemplateService };
