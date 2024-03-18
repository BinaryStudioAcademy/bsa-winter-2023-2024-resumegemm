import {
    type CreateSubscription,
    type Subscription,
    type SubscriptionResponseDto,
    type SubscriptionWithPlan,
} from './types';

interface ISubscriptionService {
    find(id: string): Promise<SubscriptionResponseDto | null>;
    findById(id: string): Promise<Subscription | null>;
    create(data: CreateSubscription): Promise<Subscription>;
    updateStatus(id: string, status: string): Promise<Subscription>;
    cancelSubscription(id: string): Promise<SubscriptionWithPlan>;
    keepSubscription(id: string): Promise<SubscriptionWithPlan>;
}

export { type ISubscriptionService };
