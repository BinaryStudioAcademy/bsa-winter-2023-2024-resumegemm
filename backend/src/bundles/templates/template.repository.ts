import { type Transaction } from 'objection';

import { TemplateEntity } from './template.entity.js';
import { type TemplateModel } from './template.model.js';

class TemplateRepository {
    private templateModel: typeof TemplateModel;

    public constructor(templateModel: typeof TemplateModel) {
        this.templateModel = templateModel;
    }

    public async updateTemplateSettings(
        templateId: string,
        updatedSettings: TemplateEntity['templateSettings'],
        transaction?: Transaction,
    ): Promise<TemplateEntity> {
        let query = this.templateModel.query().patchAndFetchById(templateId, {
            templateSettings: updatedSettings,
        });

        if (transaction) {
            query = query.transacting(transaction);
        }

        const updatedTemplate = await query;

        return TemplateEntity.initialize(updatedTemplate);
    }
}

export { TemplateRepository };