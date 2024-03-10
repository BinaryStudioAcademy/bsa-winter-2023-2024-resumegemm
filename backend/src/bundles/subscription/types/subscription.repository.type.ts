import { type CreateSubscription, type Subscription } from './types';

interface ISubscriptionRepository {
    find(id: string): Promise<Subscription | null>;
    create(data: CreateSubscription): Promise<Subscription>;
    delete(id: string): Promise<boolean>;
}

export { type ISubscriptionRepository };
