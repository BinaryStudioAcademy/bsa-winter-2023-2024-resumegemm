import { type Transaction } from 'objection';

import { type PersonalInformationModel } from './personal-info.model.js';

class PersonalInformationRepository {
    private personalInfoModel: typeof PersonalInformationModel;

    public constructor(personalInfoModel: typeof PersonalInformationModel) {
        this.personalInfoModel = personalInfoModel;
    }

    public async create(
        resumeId: string,
        payload: Partial<PersonalInformationModel>,
        transaction?: Transaction,
    ): Promise<PersonalInformationModel> {
        payload.resumeId = resumeId;
        return await this.personalInfoModel
            .query(transaction)
            .insert(payload)
            .returning('*');
    }

    public async update(
        resumeId: string,
        payload: Partial<PersonalInformationModel>,
        transaction?: Transaction,
    ): Promise<PersonalInformationModel> {
        return await this.personalInfoModel
            .query(transaction)
            .patch(payload)
            .findOne({ resumeId })
            .returning('*');
    }

    public async delete(
        resumeId: string,
        transaction?: Transaction,
    ): Promise<void> {
        await this.personalInfoModel
            .query(transaction)
            .delete()
            .where({ resumeId });
    }
}

export { PersonalInformationRepository };
