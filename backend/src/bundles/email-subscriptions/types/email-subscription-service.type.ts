import { type EmailSubscription } from './types';

interface IEmailSubscriptionService {
    subscribe(userId: string): Promise<EmailSubscription>;
    unsubscribe(id: string): Promise<void>;
}

export { type IEmailSubscriptionService };
