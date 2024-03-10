import Stripe from 'stripe';

import { StripePlanEvents } from '~/bundles/stripe-events/enums/enums.js';
import { type IStripeEventsService } from '~/bundles/stripe-events/interfaces/stripe-events-service.interface.js';
import { type SubscriptionPlanRepository } from '~/bundles/stripe-events/repositories/subscription-plan.repository.js';
import { type IConfig } from '~/common/config/interfaces/config.interface.js';

import { type StripeEventsResponseDto } from './types/types.js';

class StripeEventsService implements IStripeEventsService {
    private appConfig: IConfig;
    private subscriptionPlanRepository: SubscriptionPlanRepository;
    private stripe: Stripe;

    public constructor(
        config: IConfig,
        subscriptionPlanRepository: SubscriptionPlanRepository,
    ) {
        this.appConfig = config;
        this.subscriptionPlanRepository = subscriptionPlanRepository;
        this.stripe = new Stripe(this.appConfig.ENV.STRIPE.STRIPE_SECRET_KEY);
    }

    public async handleEvent(
        rawBody: string,
        signature: string,
    ): Promise<StripeEventsResponseDto> {
        const event: Stripe.Event = this.stripe.webhooks.constructEvent(
            rawBody,
            signature,
            this.appConfig.ENV.STRIPE.STRIPE_WEBHOOK_SECRET,
        );

        switch (event.type) {
            case StripePlanEvents.PLAN_CREATED: {
                await this.handlePlanCreated(event.data);
                break;
            }
            case StripePlanEvents.PLAN_DELETED: {
                await this.handlePlanDeleted(event.data);
                break;
            }
        }

        return { resolved: true };
    }
    private async handlePlanCreated(
        data: Stripe.PlanCreatedEvent.Data,
    ): Promise<void> {
        const plan: Stripe.Plan = data.object;

        await this.subscriptionPlanRepository.create({
            stripePlanId: plan.id,
            stripeProductId: plan.product as string,
        });
    }

    private async handlePlanDeleted(
        data: Stripe.PlanDeletedEvent.Data,
    ): Promise<void> {
        const plan: Stripe.Plan = data.object;

        await this.subscriptionPlanRepository.delete({
            stripePlanId: plan.id,
        });
    }
}

export { StripeEventsService };
