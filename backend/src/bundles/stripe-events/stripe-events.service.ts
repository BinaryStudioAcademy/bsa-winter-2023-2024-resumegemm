import Stripe from 'stripe';

import { type IStripeEventsService } from '~/bundles/stripe-events/interfaces/stripe-events-service.interface.js';
import { type IConfig } from '~/common/config/interfaces/config.interface.js';

import { subscriptionRepository } from '../subscription/subscription.js';
import { StripeSubscriptionEvents } from './enums/stripe-subscription-events.enum.js';
import { type StripeEventDispatcher } from './handlers/stripe-event-dispatcher.js';
import { type StripeEventsResponseDto } from './types/types.js';

class StripeEventsService implements IStripeEventsService {
    private appConfig: IConfig;
    private stripe: Stripe;
    private eventDispatcher: StripeEventDispatcher;

    public constructor(
        config: IConfig,
        eventDispatcher: StripeEventDispatcher,
    ) {
        this.eventDispatcher = eventDispatcher;
        this.appConfig = config;
        this.stripe = new Stripe(
            this.appConfig.ENV.STRIPE.STRIPE_WEBHOOK_SECRET,
        );
    }

    public async handleEvent(
        rawBody: string,
        signature: string,
    ): Promise<StripeEventsResponseDto> {
        const event: Stripe.Event = this.stripe.webhooks.constructEvent(
            rawBody,
            signature,
            this.appConfig.ENV.STRIPE.STRIPE_SECRET_KEY,
        );
        await this.eventDispatcher.dispatch(event.type, event.data);

        // switch (event.type) {
        //     case StripePlanEvents.PLAN_CREATED: {
        //         await this.handlePlanCreated(event.data);
        //         break;
        //     }
        //     case StripePlanEvents.PLAN_DELETED: {
        //         await this.handlePlanDeleted(event.data);
        //         break;
        //     }
        //     case StripeSubscriptionEvents.SUBSCRIPTION_STATUS_UPDATED: {
        //         await this.handleUpdateSubscriptionStatus(event.data);
        //         break;
        //     }
        // }

        return { resolved: true };
    }
    // private async handlePlanCreated(
    //     data: Stripe.PlanCreatedEvent.Data,
    // ): Promise<void> {
    //     const plan: Stripe.Plan = data.object;

    //     await this.subscriptionPlanRepository.create({
    //         stripePlanId: plan.id,
    //         stripeProductId: plan.product as string,
    //     });
    // }

    // private async handlePlanDeleted(
    //     data: Stripe.PlanDeletedEvent.Data,
    // ): Promise<void> {
    //     const plan: Stripe.Plan = data.object;

    //     await this.subscriptionPlanRepository.delete({
    //         stripePlanId: plan.id,
    //     });
    //     return {
    //         resolved: true,
    //     };
    // }

    // private async handleUpdateSubscriptionStatus(
    //     data: Stripe.CustomerSubscriptionUpdatedEvent.Data,
    // ): Promise<void> {
    //     const subscription: Stripe.Subscription = data.object;
    //     const { id, status } = subscription;
    //     await subscriptionRepository.updateStatus(id, status);
    // }
}

export { StripeEventsService };
