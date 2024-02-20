import { type TemplateBlockSettings } from 'shared/build/bundles/templates/templates.js';

import { type TemplateRepository } from './templates.js'; 

class TemplateService {
    private templateRepository: TemplateRepository;

    public constructor(templateRepository: TemplateRepository) {
        this.templateRepository = templateRepository;
    }

    public async updateTemplateSettings(templateId: string, updatedSettings: TemplateBlockSettings): Promise<void> {
        await this.templateRepository.updateTemplateSettings(templateId, updatedSettings);
    }
}

export { TemplateService };