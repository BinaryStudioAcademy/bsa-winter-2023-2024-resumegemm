import crypto from 'node:crypto';

import {
    type TemplateGetAllResponseDto,
    type TemplateUpdateItemRequestDto,
} from 'shared/build';

import { type TemplateModel } from './template.model';
import { type Template } from './types/template.type';
import { type ITemplateRepository } from './types/template-repository.type';

class TemplateRepository implements ITemplateRepository {
    private templateModel: typeof TemplateModel;

    public constructor(templateModel: typeof TemplateModel) {
        this.templateModel = templateModel;
    }
    public async find(id: string): Promise<Template | undefined> {
        return await this.templateModel.query().findById(id);
    }

    public async findAll(): Promise<TemplateGetAllResponseDto> {
        const response = await this.templateModel.query();
        return {
            items: response,
        };
    }

    public async create(payload: Template): Promise<Template> {
        payload.id = crypto.randomUUID();
        return await this.templateModel.query().insert(payload).returning('*');
    }

    public async update(
        id: string,
        data: TemplateUpdateItemRequestDto,
    ): Promise<Template> {
        return await this.templateModel.query().updateAndFetchById(id, data);
    }

    public async delete(id: string): Promise<boolean> {
        const response = await this.templateModel.query().deleteById(id);
        return response === 1 ? true : false;
    }
}

export { TemplateRepository };
