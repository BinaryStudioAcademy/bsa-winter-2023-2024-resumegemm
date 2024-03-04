import { type TemplateModel } from './template.model.js';
import { type Template } from './types/template.type';
import {
    type ITemplateRepository,
    type TemplateCreateItemRequestDto,
    type TemplateGetAllItemResponseDto,
    type TemplateGetAllResponseDto,
    type TemplateUpdateItemRequestDto,
    type TemplateUpdateItemResponseDto,
} from './types/types.js';

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

    public async create(
        payload: TemplateCreateItemRequestDto,
    ): Promise<TemplateGetAllItemResponseDto> {
        return await this.templateModel.query().insert(payload).returning('*');
    }

    public async update(
        templateId: string,
        editedSettings: TemplateUpdateItemRequestDto,
    ): Promise<TemplateUpdateItemResponseDto> {
        return await this.templateModel.query().updateAndFetchById(templateId, {
            templateSettings: editedSettings.templateSettings,
        });
    }

    public async delete(id: string): Promise<boolean> {
        const response = await this.templateModel.query().deleteById(id);
        return response === 1;
    }
}

export { TemplateRepository };
