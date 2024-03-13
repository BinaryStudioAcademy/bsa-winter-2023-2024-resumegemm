import { type Stripe } from 'stripe';

import { type IEventHandler } from '../interfaces/interfaces';
import { type SubscriptionPlanRepository } from '../repositories/subscription-plan.repository';

class SubscriptionPlanDeletedEventHandler
    implements IEventHandler<Stripe.PlanCreatedEvent.Data>
{
    private subscriptionPlanRepository: SubscriptionPlanRepository;

    public constructor(subscriptionPlanRepository: SubscriptionPlanRepository) {
        this.subscriptionPlanRepository = subscriptionPlanRepository;
    }

    public async handle(data: Stripe.PlanDeletedEvent.Data): Promise<void> {
        const plan: Stripe.Plan = data.object;

        await this.subscriptionPlanRepository.delete({
            stripePlanId: plan.id,
        });
    }
}

export { SubscriptionPlanDeletedEventHandler };
