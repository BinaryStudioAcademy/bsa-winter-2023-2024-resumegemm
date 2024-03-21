import { Stripe } from 'stripe';

import { type IConfig } from '~/common/config/interfaces/config.interface.js';

import { type IEventHandler } from '../interfaces/interfaces';
import { type SubscriptionPlanRepository } from '../repositories/subscription-plan.repository';

class SubscriptionPlanCreatedEventHandler
    implements IEventHandler<Stripe.PlanCreatedEvent.Data>
{
    private subscriptionPlanRepository: SubscriptionPlanRepository;
    private stripe: Stripe;
    private appConfig: IConfig;

    public constructor(
        subscriptionPlanRepository: SubscriptionPlanRepository,
        appConfig: IConfig,
    ) {
        this.subscriptionPlanRepository = subscriptionPlanRepository;
        this.appConfig = appConfig;
        this.stripe = new Stripe(this.appConfig.ENV.STRIPE.STRIPE_SECRET_KEY);
    }

    public async handle(data: Stripe.PlanCreatedEvent.Data): Promise<void> {
        const plan: Stripe.Plan = data.object;

        const product = await this.stripe.products.retrieve(
            plan.product as string,
        );

        await this.subscriptionPlanRepository.create({
            stripePlanId: plan.id,
            stripeProductId: plan.product as string,
            stripeProductName: product.name,
        });
    }
}

export { SubscriptionPlanCreatedEventHandler };
