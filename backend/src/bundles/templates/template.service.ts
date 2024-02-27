import {
    type TemplateCreateItemRequestDto,
    type TemplateGetAllItemResponseDto,
} from 'shared/build';
import {
    type TemplateUpdateItemRequestDto,
    type TemplateUpdateItemResponseDto,
} from 'shared/build/bundles/templates/templates.js';

import { type Template } from './types/template.type';
import {
    type ITemplateRepository,
    type ITemplateService,
} from './types/types.js';

class TemplateService implements ITemplateService {
    private templateRepository: ITemplateRepository;

    public constructor(templateRepository: ITemplateRepository) {
        this.templateRepository = templateRepository;
    }
    public async find(id: string): Promise<Template | undefined> {
        return await this.templateRepository.find(id);
    }
    public async findAll(): Promise<{
        items: TemplateGetAllItemResponseDto[];
    }> {
        return await this.templateRepository.findAll();
    }
    public async create(
        payload: TemplateCreateItemRequestDto,
    ): Promise<Template> {
        return await this.templateRepository.create(payload);
    }
    public async update(
        templateId: string,
        editedSettings: TemplateUpdateItemRequestDto,
    ): Promise<TemplateUpdateItemResponseDto> {
        return await this.templateRepository.update(templateId, editedSettings);
    }
    public async delete(id: string): Promise<boolean> {
        return await this.templateRepository.delete(id);
    }
}

export { TemplateService };
