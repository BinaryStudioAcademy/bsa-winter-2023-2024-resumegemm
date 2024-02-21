import {
    type TemplateEditRequestDto,
    type TemplateEditResponseDto,
} from 'shared/build/bundles/templates/templates.js';

import {
    type ITemplateRepository,
    type ITemplateService,
} from './types/types.js';

class TemplateService implements ITemplateService {
    private templateRepository: ITemplateRepository;

    public constructor(templateRepository: ITemplateRepository) {
        this.templateRepository = templateRepository;
    }

    public async editTemplateSettings(
        templateId: string,
        editedSettings: TemplateEditRequestDto,
    ): Promise<TemplateEditResponseDto> {
        return await this.templateRepository.edit(templateId, editedSettings);
    }
}

export { TemplateService };
