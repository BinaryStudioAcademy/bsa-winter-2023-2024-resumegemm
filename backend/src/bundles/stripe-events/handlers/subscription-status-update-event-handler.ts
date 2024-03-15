import { type Stripe } from 'stripe';

import { type SubscriptionRepository } from '~/bundles/subscription/subscription.repository';

import { type IEventHandler } from '../interfaces/interfaces';

class SubscriptionStatusUpdateEventHandler
    implements IEventHandler<Stripe.CustomerSubscriptionUpdatedEvent.Data>
{
    private subscriptionRepository: SubscriptionRepository;

    public constructor(subscriptionRepository: SubscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    public async handle(
        data: Stripe.CustomerSubscriptionUpdatedEvent.Data,
    ): Promise<void> {
        const subscription: Stripe.Subscription = data.object;
        const { id, status } = subscription;
        await this.subscriptionRepository.updateStatus(id, status);
    }
}

export { SubscriptionStatusUpdateEventHandler };
