import { type SubscriptionRepository } from './subscription.repository';
import {
    type CreateSubscription,
    type ISubscriptionService,
    type Subscription,
} from './types/types';

class SubscriptionService implements ISubscriptionService {
    private subscriptionRepository: SubscriptionRepository;

    public constructor(subscriptionRepository: SubscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    public async find(id: string): Promise<Subscription | null> {
        return await this.subscriptionRepository.find(id);
    }

    public async create(data: CreateSubscription): Promise<Subscription> {
        return await this.subscriptionRepository.create(data);
    }

    public async delete(id: string): Promise<boolean> {
        return await this.subscriptionRepository.delete(id);
    }
}

export { SubscriptionService };
