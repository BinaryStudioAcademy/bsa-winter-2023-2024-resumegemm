import { type Model,type PartialModelObject } from 'objection';

interface ITemplateService<T> {
    find(id:number): Promise<T|undefined>;
    findAll(): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    update(id: number, data: PartialModelObject<Model>): Promise<T>;
    delete(id: number): Promise<boolean>;
}

export  { type ITemplateService };