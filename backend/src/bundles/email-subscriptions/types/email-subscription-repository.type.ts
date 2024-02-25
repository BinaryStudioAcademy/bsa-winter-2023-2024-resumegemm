import { type EmailSubscription } from './types';

interface IEmailSubscriptionRepository {
    create(): Promise<EmailSubscription>;
    delete(payload: { id: string }): Promise<boolean>;
}

export { type IEmailSubscriptionRepository };
