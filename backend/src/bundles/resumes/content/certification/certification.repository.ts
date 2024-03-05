import { Guid as guid } from 'guid-typescript';
import { type Transaction } from 'objection';

import { type CertificationModel } from './certification.js';

class CertificationRepository {
    private certificationModel: typeof CertificationModel;

    public constructor(certificationModel: typeof CertificationModel) {
        this.certificationModel = certificationModel;
    }

    public async create(
        resumeId: string,
        payload: Partial<CertificationModel>,
        transaction?: Transaction,
    ): Promise<CertificationModel> {
        payload.resumeId = resumeId;
        payload.id = guid.raw();
        return await this.certificationModel
            .query(transaction)
            .insert(payload)
            .returning('*');
    }

    public async update(
        id: string,
        payload: Partial<CertificationModel>,
        transaction?: Transaction,
    ): Promise<CertificationModel> {
        return await this.certificationModel
            .query(transaction)
            .patchAndFetchById(id, payload);
    }

    public async delete(
        resumeId: string,
        transaction?: Transaction,
    ): Promise<void> {
        await this.certificationModel
            .query(transaction)
            .delete()
            .where({ resumeId });
    }
}

export { CertificationRepository };
