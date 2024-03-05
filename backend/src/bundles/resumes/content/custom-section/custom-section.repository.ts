import { Guid as guid } from 'guid-typescript';
import { type Transaction } from 'objection';

import { type CustomSectionModel } from './custom-section.model.js';

class CustomSectionRepository {
    private customSectionModel: typeof CustomSectionModel;

    public constructor(customSectionModel: typeof CustomSectionModel) {
        this.customSectionModel = customSectionModel;
    }

    public async create(
        resumeId: string,
        payload: Partial<CustomSectionModel>,
        transaction?: Transaction,
    ): Promise<CustomSectionModel> {
        payload.resumeId = resumeId;
        payload.id = guid.raw();
        return await this.customSectionModel
            .query(transaction)
            .insert(payload)
            .returning('*');
    }

    public async update(
        id: string,
        payload: Partial<CustomSectionModel>,
        transaction?: Transaction,
    ): Promise<CustomSectionModel> {
        return await this.customSectionModel
            .query(transaction)
            .patchAndFetchById(id, payload);
    }

    public async delete(
        resumeId: string,
        transaction?: Transaction,
    ): Promise<void> {
        await this.customSectionModel
            .query(transaction)
            .delete()
            .where({ resumeId });
    }
}

export { CustomSectionRepository };
