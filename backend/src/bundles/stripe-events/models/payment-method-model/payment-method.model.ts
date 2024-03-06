import { type RelationMappings } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class PaymentMethodModel extends AbstractModel {
    public 'customerId': string;
    public 'paymentMethodId': string;
    public 'type': string;

    public static override get tableName(): typeof DatabaseTableName.PAYMENT_METHOD {
        return DatabaseTableName.PAYMENT_METHOD;
    }

    public static getRelationMappings(): RelationMappings {
        return {};
    }
}

export { PaymentMethodModel };
