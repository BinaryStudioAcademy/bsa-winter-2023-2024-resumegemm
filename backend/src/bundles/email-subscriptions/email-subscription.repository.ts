import { Guid as guid } from 'guid-typescript';
import { type Transaction } from 'objection';

import { type EmailSubscriptionModel } from './email-subscription.model.js';
import {
    type EmailSubscription,
    type IEmailSubscriptionRepository,
} from './types/types.js';

class EmailSubscriptionRepository implements IEmailSubscriptionRepository {
    private emailSubscriptionModel: typeof EmailSubscriptionModel;

    public constructor(emailSubscriptionModel: typeof EmailSubscriptionModel) {
        this.emailSubscriptionModel = emailSubscriptionModel;
    }

    public async create(transaction: Transaction): Promise<EmailSubscription> {
        return await this.emailSubscriptionModel
            .query()
            .insert({
                id: guid.raw(),
            })
            .transacting(transaction)
            .returning('*');
    }

    public async delete({ id }: { id: string }): Promise<boolean> {
        const response = await this.emailSubscriptionModel
            .query()
            .deleteById(id);
        return !!response;
    }
}

export { EmailSubscriptionRepository };
