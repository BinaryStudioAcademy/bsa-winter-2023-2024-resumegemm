import { type RelationMappings } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class CurrentSubscriptionModel extends AbstractModel {
    public 'customerId': string;
    public 'subscriptionId': string;
    public 'subscriptionDateStart': Date;
    public 'subscriptionDateEnd': Date;
    public 'isActive': boolean;

    public static override get tableName(): typeof DatabaseTableName.CURRENT_SUBSCRIPTIONS {
        return DatabaseTableName.CURRENT_SUBSCRIPTIONS;
    }

    public static getRelationMappings(): RelationMappings {
        return {};
    }
}

export { CurrentSubscriptionModel };
