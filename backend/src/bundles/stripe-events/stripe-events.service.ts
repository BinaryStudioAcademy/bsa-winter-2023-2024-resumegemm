import Stripe from 'stripe';

import { type IStripeEventsService } from '~/bundles/stripe-events/interfaces/stripe-events-service.interface';
import { type IConfig } from '~/common/config/interfaces/config.interface';

import {
    type StripeEventsRequestDto,
    type StripeEventsResponseDto,
} from './types/types.js';

class StripeEventsService implements IStripeEventsService {
    private appConfig: IConfig;
    private stripe: Stripe;

    public constructor(config: IConfig) {
        this.appConfig = config;
        this.stripe = new Stripe(this.appConfig.ENV.STRIPE.STRIPE_SECRET_KEY);
    }

    public handleEvent(body: StripeEventsRequestDto): StripeEventsResponseDto {
        return { resolved: true };
    }
}

export { StripeEventsService };
