import { type Transaction } from 'objection';

import { type EmailSubscription } from './types';

interface IEmailSubscriptionRepository {
    create(payload: {
        userId: string;
        transaction: Transaction;
    }): Promise<EmailSubscription>;
    delete(payload: { id: string }): Promise<boolean>;
}

export { type IEmailSubscriptionRepository };
