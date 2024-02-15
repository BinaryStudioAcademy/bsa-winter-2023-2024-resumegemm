import  { type Model, type PartialModelObject } from 'objection';

import  { type Template } from './types/template.type';
import  { type ITemplateRepository } from './types/template-repository.type';
import  { type ITemplateService } from './types/template-service.type';

class TemplateService implements ITemplateService<Template> {
    private templateRepository: ITemplateRepository<Template>;

    public constructor(templateRepository:ITemplateRepository<Template>){
        this.templateRepository = templateRepository;
    }
    public async find(id: number): Promise<Template| undefined> {
        return await  this.templateRepository.find(id);
    }
    public async findAll(): Promise<{ items: Template[]; }> {
        const items =  await this.templateRepository.findAll();
        return{
            items
        };
    }
    public async create(payload: unknown): Promise<Template> {
        return await this.templateRepository.create(payload);
    }
    public async update(id: number, data: PartialModelObject<Model>): Promise<Template> {
        return await this.templateRepository.update(id,data);
    }
    public async delete(id: number): Promise<boolean> {
        return await this.templateRepository.delete(id);
    }
    
}

export { TemplateService };