import { type RelationMappings } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class PaymentMethodModel extends AbstractModel {
    public 'userId': string;

    public 'paymentMethodId': string;

    public 'card': string;

    public 'expireDate': Date;

    public static override get tableName(): typeof DatabaseTableName.PAYMENT_METHOD {
        return DatabaseTableName.PAYMENT_METHOD;
    }

    public static getRelationMappings(): RelationMappings {
        return {};
    }
}

export { PaymentMethodModel };
