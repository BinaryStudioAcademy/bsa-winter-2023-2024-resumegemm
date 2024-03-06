import { Guid as guid } from 'guid-typescript';
import { type Transaction } from 'objection';

import { type ExperienceModel } from './experience.model.js';

class ExperienceRepository {
    private experienceModel: typeof ExperienceModel;

    public constructor(experienceModel: typeof ExperienceModel) {
        this.experienceModel = experienceModel;
    }

    public async create(
        resumeId: string,
        payload: Partial<ExperienceModel>,
        transaction?: Transaction,
    ): Promise<ExperienceModel> {
        payload.resumeId = resumeId;
        payload.id = guid.raw();
        return await this.experienceModel
            .query(transaction)
            .insert(payload)
            .returning('*');
    }

    public async update(
        id: string,
        payload: Partial<ExperienceModel>,
        transaction?: Transaction,
    ): Promise<ExperienceModel> {
        return await this.experienceModel
            .query(transaction)
            .patchAndFetchById(id, payload);
    }

    public async delete(
        resumeId: string,
        transaction?: Transaction,
    ): Promise<void> {
        await this.experienceModel
            .query(transaction)
            .delete()
            .where({ resumeId });
    }
}

export { ExperienceRepository };
