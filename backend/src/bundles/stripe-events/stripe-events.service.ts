import Stripe from 'stripe';

import { StripePlanEvents } from '~/bundles/stripe-events/enums/enums.js';
import { type IStripeEventsService } from '~/bundles/stripe-events/interfaces/stripe-events-service.interface';
import { type IConfig } from '~/common/config/interfaces/config.interface';

import { type StripeEventsResponseDto } from './types/types.js';

class StripeEventsService implements IStripeEventsService {
    private appConfig: IConfig;
    private stripe: Stripe;

    public constructor(config: IConfig) {
        this.appConfig = config;
        this.stripe = new Stripe(this.appConfig.ENV.STRIPE.STRIPE_SECRET_KEY);
    }

    public handleEvent(
        rawBody: string,
        signature: string,
    ): StripeEventsResponseDto {
        const event: Stripe.Event = this.stripe.webhooks.constructEvent(
            rawBody,
            signature,
            this.appConfig.ENV.STRIPE.STRIPE_WEBHOOK_SECRET,
        );

        // handle event

        return { resolved: true };
    }
}

export { StripeEventsService };
