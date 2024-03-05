import { Guid as guid } from 'guid-typescript';
import { type Transaction } from 'objection';

import { type LanguageModel } from './language.js';

class LanguageRepository {
    private languageModel: typeof LanguageModel;

    public constructor(languageModel: typeof LanguageModel) {
        this.languageModel = languageModel;
    }

    public async create(
        resumeId: string,
        payload: Partial<LanguageModel>,
        transaction?: Transaction,
    ): Promise<LanguageModel> {
        payload.resumeId = resumeId;
        payload.id = guid.raw();
        return await this.languageModel
            .query(transaction)
            .insert(payload)
            .returning('*');
    }

    public async update(
        id: string,
        payload: Partial<LanguageModel>,
        transaction?: Transaction,
    ): Promise<LanguageModel> {
        return await this.languageModel
            .query(transaction)
            .patchAndFetchById(id, payload);
    }

    public async delete(
        resumeId: string,
        transaction?: Transaction,
    ): Promise<void> {
        await this.languageModel
            .query(transaction)
            .delete()
            .where({ resumeId });
    }
}

export { LanguageRepository };
