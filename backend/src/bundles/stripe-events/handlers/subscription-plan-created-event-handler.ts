import { type Stripe } from 'stripe';

import { type IEventHandler } from '../interfaces/interfaces';
import { type SubscriptionPlanRepository } from '../repositories/subscription-plan.repository';

class SubscriptionPlanCreatedEventHandler
    implements IEventHandler<Stripe.PlanCreatedEvent.Data>
{
    private subscriptionPlanRepository: SubscriptionPlanRepository;

    public constructor(subscriptionPlanRepository: SubscriptionPlanRepository) {
        this.subscriptionPlanRepository = subscriptionPlanRepository;
    }

    public async handle(data: Stripe.PlanCreatedEvent.Data): Promise<void> {
        const plan: Stripe.Plan = data.object;

        await this.subscriptionPlanRepository.create({
            stripePlanId: plan.id,
            stripeProductId: plan.product as string,
        });
    }
}

export { SubscriptionPlanCreatedEventHandler };
