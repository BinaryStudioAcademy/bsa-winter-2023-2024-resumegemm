import Stripe from 'stripe';

import { type IConfig } from '~/common/config/config';

import { type CreatePaymentIntentRequestDto, type CreatePaymentIntentResponseDto } from './types/types';

class PaymentService {
    private appConfig: IConfig;
    private stripe: Stripe;

    public constructor(config: IConfig) {
        this.appConfig = config;
        this.stripe = new Stripe(this.appConfig.ENV.STRIPE.STRIPE_API_KEY);
    }
    public async createPaymentIntent(createPaymentIntentRequestDto: CreatePaymentIntentRequestDto): Promise<CreatePaymentIntentResponseDto> {
        const { currency, amount } = createPaymentIntentRequestDto;

        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: amount,
            currency: currency
        });

        return { clientSecret: paymentIntent.client_secret };
    }
}

export { PaymentService };
