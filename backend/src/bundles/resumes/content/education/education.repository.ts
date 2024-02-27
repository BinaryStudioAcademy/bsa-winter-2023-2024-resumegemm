import { type Transaction } from 'objection';

import { type EducationModel } from './education';

class EducationRepository {
    private educationModel: typeof EducationModel;

    public constructor(educationModel: typeof EducationModel) {
        this.educationModel = educationModel;
    }

    public async create(
        resumeId: string,
        payload: Partial<EducationModel>,
        transaction?: Transaction,
    ): Promise<EducationModel> {
        payload.resumeId = resumeId;
        return await this.educationModel
            .query(transaction)
            .insert(payload)
            .returning('*');
    }

    public async update(
        id: string,
        payload: Partial<EducationModel>,
        transaction?: Transaction,
    ): Promise<EducationModel> {
        return await this.educationModel
            .query(transaction)
            .patchAndFetchById(id, payload);
    }

    public async delete(
        resumeId: string,
        transaction?: Transaction,
    ): Promise<void> {
        await this.educationModel
            .query(transaction)
            .delete()
            .where({ resumeId });
    }
}

export { EducationRepository };
