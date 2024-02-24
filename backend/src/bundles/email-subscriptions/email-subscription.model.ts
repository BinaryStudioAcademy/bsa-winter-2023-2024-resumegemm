import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class EmailSubscriptionModel extends AbstractModel {
    public 'userId': string;

    public static override get tableName(): typeof DatabaseTableName.EMAIL_SUBSCRIPTIONS {
        return DatabaseTableName.EMAIL_SUBSCRIPTIONS;
    }
}

export { EmailSubscriptionModel };
