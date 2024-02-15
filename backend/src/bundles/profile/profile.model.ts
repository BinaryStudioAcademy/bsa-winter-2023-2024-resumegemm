import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class ProfileModel extends AbstractModel {
    public 'firstName': string;
    public 'lastName': string;
    public 'avatar': string;

    public static override get tableName(): typeof DatabaseTableName.PROFILE {
        return DatabaseTableName.PROFILE;
    }
}

export { ProfileModel };
