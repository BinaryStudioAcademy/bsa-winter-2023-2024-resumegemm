import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { SubscriptionPlanModel } from '../stripe-events/models/subscription-plan.model.js';
import { UserModel } from '../users/user.model.js';

class SubscriptionModel extends AbstractModel {
    public 'status': string;

    public 'subscriptionId': string;

    public 'isCancelled': boolean;

    public 'userId': string;

    public 'subscriptionPlanId': string;

    public 'startDate': Date;

    public 'endDate': Date;

    public static override get tableName(): typeof DatabaseTableName.SUBSCRIPTION {
        return DatabaseTableName.SUBSCRIPTION;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            user: {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.SUBSCRIPTION}.userId`,
                    to: `${DatabaseTableName.USERS}.id`,
                },
            },
            subscriptionPlan: {
                relation: Model.HasOneRelation,
                modelClass: SubscriptionPlanModel,
                join: {
                    from: `${DatabaseTableName.SUBSCRIPTION}.subscriptionPlanId`,
                    to: `${DatabaseTableName.SUBSCRIPTION_PLANS}.id`,
                },
            },
        };
    }
}

export { SubscriptionModel };
