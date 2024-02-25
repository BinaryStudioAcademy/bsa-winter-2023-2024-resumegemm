import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class ContactsModel extends AbstractModel {
    public 'resumeId': string;
    public 'phone': string;
    public 'homeNumber': string;
    public 'address': string;
    public 'socialContact': string;

    public static override get tableName(): typeof DatabaseTableName.CONTACT_DETAILS {
        return DatabaseTableName.CONTACT_DETAILS;
    }
}

export { ContactsModel };
