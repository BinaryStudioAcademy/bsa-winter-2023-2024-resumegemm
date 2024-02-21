import { type TemplateModel } from './template.model.js';
import {
    type ITemplateRepository,
    type TemplateEditRequestDto,
    type TemplateEditResponseDto,
} from './types/types.js';

class TemplateRepository implements ITemplateRepository {
    private templateModel: typeof TemplateModel;

    public constructor(templateModel: typeof TemplateModel) {
        this.templateModel = templateModel;
    }

    public async edit(
        templateId: string,
        editedSettings: TemplateEditRequestDto,
    ): Promise<TemplateEditResponseDto> {
        return await this.templateModel.query().updateAndFetchById(templateId, {
            templateSettings: editedSettings.templateSettings,
        });
    }
}

export { TemplateRepository };
