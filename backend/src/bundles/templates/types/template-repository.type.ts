import { type Model, type PartialModelObject } from 'objection';

interface ITemplateRepository<T> {
    find(id: number): Promise<T| undefined>;
    findAll(): Promise<T[]>;
    create(payload: unknown): Promise<T>;
    update(id: number, data: PartialModelObject<Model>): Promise<T>;
    delete(id: number): Promise<boolean>;
}

export { type ITemplateRepository };
