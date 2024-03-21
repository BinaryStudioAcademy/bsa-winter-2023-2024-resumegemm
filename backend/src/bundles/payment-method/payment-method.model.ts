import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { UserModel } from '../users/user.model.js';

class PaymentMethodModel extends AbstractModel {
    public 'userId': string;

    public 'paymentMethodId': string;

    public 'card': string;

    public 'expireDate': Date;

    public static override get tableName(): typeof DatabaseTableName.PAYMENT_METHOD {
        return DatabaseTableName.PAYMENT_METHOD;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            users: {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.PAYMENT_METHOD}.userId`,
                    to: `${DatabaseTableName.USERS}.id`,
                },
            },
        };
    }
}

export { PaymentMethodModel };
