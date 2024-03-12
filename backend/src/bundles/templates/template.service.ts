import { type TemplateGetAllItemResponseDto } from 'shared/build';
import {
    type TemplateUpdateItemRequestDto,
    type TemplateUpdateItemResponseDto,
} from 'shared/build/bundles/templates/templates.js';

import { testTemplate } from './constants/test-template.js';
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
    public async create(payload: { userId: string }): Promise<Template> {
        return await this.templateRepository.create({
            isOwner: true,
            templateSettings: testTemplate,
            image: 'https://s3-alpha.figma.com/hub/file/1849672021/64b2b02b-08cd-4afd-9f93-e05858d2fffd-cover.png',
            userId: payload.userId,
        });
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
