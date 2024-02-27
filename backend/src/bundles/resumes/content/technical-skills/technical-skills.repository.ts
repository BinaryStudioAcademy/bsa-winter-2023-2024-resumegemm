import { type Transaction } from 'objection';

import { type TechnicalSkillModel } from './technical-skills.model.js';

class TechnicalSkillsRepository {
    private technicalSkillModel: typeof TechnicalSkillModel;

    public constructor(technicalSkillModel: typeof TechnicalSkillModel) {
        this.technicalSkillModel = technicalSkillModel;
    }

    public async create(
        resumeId: string,
        payload: Partial<TechnicalSkillModel>,
        transaction?: Transaction,
    ): Promise<TechnicalSkillModel> {
        payload.resumeId = resumeId;
        return await this.technicalSkillModel
            .query(transaction)
            .insert(payload)
            .returning('*');
    }

    public async update(
        id: string,
        payload: Partial<TechnicalSkillModel>,
        transaction?: Transaction,
    ): Promise<TechnicalSkillModel> {
        return await this.technicalSkillModel
            .query(transaction)
            .patchAndFetchById(id, payload);
    }

    public async delete(
        resumeId: string,
        transaction?: Transaction,
    ): Promise<void> {
        await this.technicalSkillModel
            .query(transaction)
            .delete()
            .where({ resumeId });
    }
}

export { TechnicalSkillsRepository };
