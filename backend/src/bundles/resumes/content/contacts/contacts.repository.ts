import { type Transaction } from 'objection';

import { type ContactsModel } from './contacts.model';

class ContactsRepository {
    private contactsModel: typeof ContactsModel;

    public constructor(contactsModel: typeof ContactsModel) {
        this.contactsModel = contactsModel;
    }

    public async find(resumeId: string): Promise<ContactsModel | undefined> {
        return await this.contactsModel.query().findOne({ resumeId });
    }

    public async create(
        resmeId: string,
        payload: Partial<ContactsModel>,
        transaction?: Transaction,
    ): Promise<ContactsModel> {
        payload.resumeId = resmeId;
        return await this.contactsModel
            .query(transaction)
            .insert(payload)
            .returning('*');
    }

    public async update(
        resumeId: string,
        payload: Partial<ContactsModel>,
        transaction?: Transaction,
    ): Promise<ContactsModel> {
        return await this.contactsModel
            .query(transaction)
            .patch(payload)
            .findOne({ resumeId })
            .returning('*');
    }

    public async delete(
        resumeId: string,
        transaction?: Transaction,
    ): Promise<void> {
        await this.contactsModel
            .query(transaction)
            .delete()
            .where({ resumeId });
    }
}

export { ContactsRepository };
