import { formatDate } from './helpers/helpers.js';
import { type SubscriptionRepository } from './subscription.repository';
import {
    type CreateSubscription,
    type ISubscriptionService,
    type Subscription,
    type SubscriptionResponseDto,
} from './types/types';

class SubscriptionService implements ISubscriptionService {
    private subscriptionRepository: SubscriptionRepository;

    public constructor(subscriptionRepository: SubscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    public async find(id: string): Promise<SubscriptionResponseDto | null> {
        const subscription = await this.subscriptionRepository.find(id);

        if (subscription) {
            const { startDate, endDate } = subscription;
            const start = formatDate(startDate);
            const end = formatDate(endDate);

            return { ...subscription, startDate: start, endDate: end };
        }

        return null;
    }

    public async create(data: CreateSubscription): Promise<Subscription> {
        return await this.subscriptionRepository.create(data);
    }

    public async updateStatus(
        id: string,
        status: string,
    ): Promise<Subscription> {
        return await this.subscriptionRepository.updateStatus(id, status);
    }

    public async delete(id: string): Promise<boolean> {
        return await this.subscriptionRepository.delete(id);
    }
}

export { SubscriptionService };
