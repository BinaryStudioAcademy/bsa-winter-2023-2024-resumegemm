import Stripe from 'stripe';

import {
    StripePaymentMethodEvents,
    StripePlanEvents,
} from '~/bundles/stripe-events/enums/enums.js';
import { type IStripeEventsService } from '~/bundles/stripe-events/interfaces/stripe-events-service.interface.js';
import { type SubscriptionPlanRepository } from '~/bundles/stripe-events/repositories/subscription-plan.repository.js';
import { type IConfig } from '~/common/config/interfaces/config.interface.js';

import { type PaymentMethodRepository } from './repositories/payment-method.repository.js';
import {
    type StripeEventsResponseDto,
    type SubscriptionPlan,
} from './types/types.js';

class StripeEventsService implements IStripeEventsService {
    private appConfig: IConfig;
    private subscriptionPlanRepository: SubscriptionPlanRepository;
    private paymentMethodRepository: PaymentMethodRepository;
    private stripe: Stripe;

    public constructor(
        config: IConfig,
        subscriptionPlanRepository: SubscriptionPlanRepository,
        paymentMethodRepository: PaymentMethodRepository,
    ) {
        this.appConfig = config;
        this.subscriptionPlanRepository = subscriptionPlanRepository;
        this.paymentMethodRepository = paymentMethodRepository;
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
            case StripePaymentMethodEvents.PAYMENT_METHOD_ATTACHED: {
                await this.handlePaymentMethodCreate(event.data);
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

        const existingPlan: SubscriptionPlan | undefined =
            await this.subscriptionPlanRepository.find({
                stripePlanId: plan.id,
            });

        if (existingPlan) {
            await this.subscriptionPlanRepository.delete(existingPlan.id);
        }
    }

    private async handlePaymentMethodCreate(
        data: Stripe.PaymentMethodAttachedEvent.Data,
    ): Promise<void> {
        const paymentMethod: Stripe.PaymentMethod = data.object;

        if (paymentMethod.customer) {
            await this.paymentMethodRepository.create({
                customerId: paymentMethod.customer.toString(),
                paymentMethodId: paymentMethod.id,
                type: paymentMethod.type,
            });
        }
    }
}

export { StripeEventsService };
