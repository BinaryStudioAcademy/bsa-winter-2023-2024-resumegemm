import { type Transaction } from 'objection';

import { type EmailSubscription } from './types';

interface IEmailSubscriptionRepository {
    create(transaction: Transaction): Promise<EmailSubscription>;
    delete(payload: { id: string }): Promise<boolean>;
}

export { type IEmailSubscriptionRepository };
