import { type RelationMappings } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class SubscriptionPlanModel extends AbstractModel {
    public 'stripePlanId': string;
    public 'stripeProductId': string;
    public 'stripeProductName': string;
    public 'isActive': boolean;

    public static override get tableName(): typeof DatabaseTableName.SUBSCRIPTION_PLANS {
        return DatabaseTableName.SUBSCRIPTION_PLANS;
    }

    public static getRelationMappings(): RelationMappings {
        return {};
    }
}

export { SubscriptionPlanModel };
