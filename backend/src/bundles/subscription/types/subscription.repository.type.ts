import { type CreateSubscription, type Subscription } from './types';

interface ISubscriptionRepository {
    find(id: string): Promise<Subscription | null>;
    create(data: CreateSubscription): Promise<Subscription>;
    updateStatus(id: string, status: string): Promise<Subscription>;
    delete(id: string): Promise<boolean>;
}

export { type ISubscriptionRepository };
