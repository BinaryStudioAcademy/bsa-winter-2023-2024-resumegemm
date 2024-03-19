import crypto from 'node:crypto';

import { type Transaction } from 'objection';
import {
    type TemplateGetAllResponseDto,
    type TemplateUpdateItemRequestDto,
} from 'shared/build/index.js';

import { type TemplateModel } from './template.model';
import { type Template } from './types/template.type';
import { type ITemplateRepository } from './types/template-repository.type';
import { type FindAllOptions } from './types/types';

const SORTING_FIELD = 'name';

class TemplateRepository implements ITemplateRepository {
    private templateModel: typeof TemplateModel;

    public constructor(templateModel: typeof TemplateModel) {
        this.templateModel = templateModel;
    }
    public async find(id: string): Promise<Template | undefined> {
        return await this.templateModel.query().findById(id);
    }

    public async findAll(
        options?: FindAllOptions,
    ): Promise<TemplateGetAllResponseDto> {
        let query = this.templateModel.query();

        if (options?.direction) {
            query = query.orderBy(SORTING_FIELD, options.direction);
        }

        if (options?.name) {
            const nameLower = options.name.toLowerCase();
            query = query.whereRaw('LOWER(name) LIKE ?', [`%${nameLower}%`]);
        }

        const response = await query;

        return {
            items: response,
        };
    }

    public async create(
        payload: Template,
        transaction?: Transaction,
    ): Promise<Template> {
        payload.id = crypto.randomUUID();
        return await this.templateModel
            .query(transaction)
            .insert(payload)
            .returning('*');
    }

    public async update(
        id: string,
        data: TemplateUpdateItemRequestDto,
        transaction?: Transaction,
    ): Promise<Template> {
        return await this.templateModel
            .query(transaction)
            .updateAndFetchById(id, data);
    }

    public async delete(id: string): Promise<boolean> {
        const response = await this.templateModel.query().deleteById(id);
        return response === 1;
    }
}

export { TemplateRepository };
