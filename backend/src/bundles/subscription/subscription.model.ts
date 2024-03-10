import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { SubscriptionPlanModel } from '../stripe-events/models/subscription-plan.model';
import { UserModel } from '../users/user.model';

class SubscriptionModel extends AbstractModel {
    public 'status': string;
    public 'subscriptionPlanId': string;
    public 'subscriptionId': string;
    public 'userId': string;

    public static override get tableName(): typeof DatabaseTableName.SUBSCRIPTION {
        return DatabaseTableName.SUBSCRIPTION;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            subscriptionPlan: {
                relation: Model.HasOneRelation,
                modelClass: SubscriptionPlanModel,
                join: {
                    from: `${DatabaseTableName.SUBSCRIPTION}.subscriptionPlanId`,
                    to: `${DatabaseTableName.SUBSCRIPTION_PLANS}.id`,
                },
            },
            user: {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.SUBSCRIPTION}.userId`,
                    to: `${DatabaseTableName.USERS}.id`,
                },
            },
        };
    }
}

export { SubscriptionModel };
