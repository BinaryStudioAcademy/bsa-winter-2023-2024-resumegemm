import crypto from 'node:crypto';

import  { type PartialModelObject } from 'objection';

import  { type TemplateModel } from './template.model';
import  { type Template } from './types/template.type';
import  { type ITemplateRepository } from './types/template-repository.type';

class TemplateRepository implements ITemplateRepository<Template> {
    private templateModel: typeof TemplateModel;

    public constructor(templateModel: typeof TemplateModel) {
        this.templateModel = templateModel;

}
    public async find(id:number): Promise<Template | undefined> {
        return await this.templateModel.query().findById(id);
    }

    public async findAll(): Promise<Template[]> {
        return await this.templateModel.query();
    }

    public async create(payload: Template): Promise<Template> {
        payload.id = crypto.randomUUID();
        return await this.templateModel.query().insert(payload).returning('*');
    }

    public async update(id:number, data:PartialModelObject<TemplateModel>): Promise<Template> {
        return await this.templateModel.query().updateAndFetchById(id,data);
    }

    public async delete(id:number): Promise<boolean> {
        const response = await this.templateModel.query().deleteById(id);
        return response === 1 ? true : false;
    }
}

export { TemplateRepository };