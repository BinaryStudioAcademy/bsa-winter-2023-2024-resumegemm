import { type CreateSubscription, type Subscription } from './types';

interface ISubscriptionService {
    find(id: string): Promise<Subscription | null>;
    create(data: CreateSubscription): Promise<Subscription>;
    delete(id: string): Promise<boolean>;
    updateStatus(id: string, status: string): Promise<Subscription>;
}

export { type ISubscriptionService };