import Stripe from 'stripe';

import { type IStripeEventsService } from '~/bundles/stripe-events/interfaces/stripe-events-service.interface.js';
import { type IConfig } from '~/common/config/interfaces/config.interface.js';

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

        return {
            resolved: true,
        };
    }
}

export { StripeEventsService };
