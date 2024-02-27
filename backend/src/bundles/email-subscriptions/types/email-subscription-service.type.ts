import { type UserWithRelations } from 'shared/build';

import { type EmailSubscription } from './types';

interface IEmailSubscriptionService {
    subscribe(user: UserWithRelations): Promise<EmailSubscription>;
    unsubscribe(id: string): Promise<void>;
}

export { type IEmailSubscriptionService };
