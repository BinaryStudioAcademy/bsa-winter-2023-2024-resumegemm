import {
    type CreateSubscription,
    type Subscription,
    type SubscriptionResponseDto,
} from './types';

interface ISubscriptionService {
    find(id: string): Promise<SubscriptionResponseDto | null>;
    create(data: CreateSubscription): Promise<Subscription>;
    delete(id: string): Promise<boolean>;
    updateStatus(id: string, status: string): Promise<Subscription>;
}

export { type ISubscriptionService };
