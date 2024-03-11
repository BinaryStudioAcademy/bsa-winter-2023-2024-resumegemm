import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { UserModel } from '../users/user.model.js';

class SubscriptionModel extends AbstractModel {
    public 'status': string;

    public 'subscriptionId': string;

    public 'userId': string;

    public 'subscriptionPlanId': string;

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
        };
    }
}

export { SubscriptionModel };
