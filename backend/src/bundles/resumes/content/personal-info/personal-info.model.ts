import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class PersonalInformationModel extends AbstractModel {
    public 'resumeId': string;
    public 'profession': string;
    public 'address': string;
    public 'city': string;
    public 'state': string;

    public static override get tableName(): typeof DatabaseTableName.PERSONAL_INFORMATION {
        return DatabaseTableName.PERSONAL_INFORMATION;
    }
}

export { PersonalInformationModel };
