import Stripe from 'stripe';

import {
    StripeCustomerEvents,
    StripePlanEvents,
} from '~/bundles/stripe-events/enums/enums.js';
import { type IStripeEventsService } from '~/bundles/stripe-events/interfaces/stripe-events-service.interface.js';
import { type SubscriptionPlanRepository } from '~/bundles/stripe-events/repositories/subscription-plan.repository.js';
import { type IConfig } from '~/common/config/interfaces/config.interface.js';
import { MailService } from '~/common/mail-service/mail-service.package.js';

import { generateSubscriptionEmailPayload } from './helpers/subscription-email-generator.js';
import {
    type StripeCustomer,
    type StripeEventsResponseDto,
} from './types/types.js';

class StripeEventsService implements IStripeEventsService {
    private appConfig: IConfig;
    private subscriptionPlanRepository: SubscriptionPlanRepository;
    private stripe: Stripe;
    private mailSender: MailService;

    public constructor(
        config: IConfig,
        subscriptionPlanRepository: SubscriptionPlanRepository,
    ) {
        this.appConfig = config;
        this.subscriptionPlanRepository = subscriptionPlanRepository;
        this.stripe = new Stripe(
            this.appConfig.ENV.STRIPE.STRIPE_WEBHOOK_SECRET,
        );
        this.mailSender = MailService.getInstance();
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

        switch (event.type) {
            case StripeCustomerEvents.SUBSCRIPTION_CREATED: {
                await this.handleSubscriptionCreated(event.data);
                break;
            }
            case StripePlanEvents.PLAN_CREATED: {
                await this.handlePlanCreated(event.data);
                break;
            }
            case StripePlanEvents.PLAN_UPDATED: {
                await this.handlePlanDeleted(event.data);
                break;
            }
            default: {
                return {
                    resolved: false,
                };
            }
        }

        return {
            resolved: true,
        };
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

    private async handleSubscriptionCreated(
        data: Stripe.CustomerSubscriptionCreatedEvent.Data,
    ): Promise<void> {
        const subscription: Stripe.Subscription = data.object;
        const customerId = subscription.customer as string;
        const customer = (await this.stripe.customers.retrieve(
            customerId,
        )) as StripeCustomer;
        const { current_period_start, current_period_end } = subscription;
        const { name, email } = customer;
        const emailPayload = generateSubscriptionEmailPayload({
            email,
            subject: 'Subscription',
            name,
            current_period_start,
            current_period_end,
        });
        void this.mailSender.sendMail(emailPayload);
    }
}

export { StripeEventsService };
