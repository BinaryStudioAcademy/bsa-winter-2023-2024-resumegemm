import { Guid as guid } from 'guid-typescript';

import { type EmailSubscriptionModel } from './email-subscription.model.js';
import {
    type EmailSubscription,
    type IEmailSubscriptionRepository,
} from './types/types';

class EmailSubscriptionRepository implements IEmailSubscriptionRepository {
    private emailSubscriptionModel: typeof EmailSubscriptionModel;

    public constructor(emailSubscriptionModel: typeof EmailSubscriptionModel) {
        this.emailSubscriptionModel = emailSubscriptionModel;
    }

    public async create(): Promise<EmailSubscription> {
        return await this.emailSubscriptionModel
            .query()
            .insert({
                id: guid.raw(),
            })
            .returning('*');
    }

    public async delete({ id }: { id: string }): Promise<boolean> {
        const response = await this.emailSubscriptionModel
            .query()
            .deleteById(id);
        return response === 1 ? true : false;
    }
}

export { EmailSubscriptionRepository };
