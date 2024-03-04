import { HttpCode, HttpError } from 'shared/build/index.js';
import Stripe from 'stripe';

import { type IConfig } from '~/common/config/config';

import { PaymentErrorMessage } from './enums/error-message.js';
import { mapPrices } from './helpers/price-mapper.js';
import {
    type CreateSubscriptionRequestDto,
    type CreateSubscriptionResponseDto,
    type GetPricesResponseDto,
    type GetPublishableKeyResponseDto,
    type IPaymentService,
} from './types/types';

class PaymentService implements IPaymentService {
    private appConfig: IConfig;
    private stripe: Stripe;

    public constructor(config: IConfig) {
        this.appConfig = config;
        this.stripe = new Stripe(this.appConfig.ENV.STRIPE.STRIPE_SECRET_KEY);
    }

    public getPublishableKey(): GetPublishableKeyResponseDto {
        return {
            publishableKey: this.appConfig.ENV.STRIPE.STRIPE_PUBLISHABLE_KEY,
        };
    }

    public async getPrices(): Promise<GetPricesResponseDto> {
        try {
            const { data } = await this.stripe.prices.list({
                expand: ['data.product'],
            });

            return {
                prices: data.map((price) =>
                    mapPrices(
                        price as Stripe.Price & { product: Stripe.Product },
                    ),
                ),
            };
        } catch {
            throw new HttpError({
                message: PaymentErrorMessage.GET_PRICES_ERROR,
                status: HttpCode.BAD_REQUEST,
            });
        }
    }

    private async createStripeCustomer(
        name: string,
        email: string,
        paymentMethod: string,
    ): Promise<Stripe.Customer> {
        try {
            return await this.stripe.customers.create({
                name: name,
                email: email,
                payment_method: paymentMethod,
                invoice_settings: {
                    default_payment_method: paymentMethod,
                },
            });
        } catch {
            throw new HttpError({
                message: PaymentErrorMessage.STRIPE_USER_CREATE_ERROR,
                status: HttpCode.BAD_REQUEST,
            });
        }
    }

    private async createStripeSubscription(
        customerId: string,
        priceId: string,
    ): Promise<Stripe.Subscription> {
        try {
            return await this.stripe.subscriptions.create({
                customer: customerId,
                items: [{ price: priceId }],
                payment_settings: {
                    payment_method_options: {
                        card: {
                            request_three_d_secure: 'any',
                        },
                    },
                    payment_method_types: ['card'],
                    save_default_payment_method: 'on_subscription',
                },
                expand: ['latest_invoice.payment_intent'],
            });
        } catch {
            throw new HttpError({
                message: PaymentErrorMessage.STRIPE_SUBSCRIPTION_CREATE_ERROR,
                status: HttpCode.BAD_REQUEST,
            });
        }
    }

    public async createSubscription({
        name,
        email,
        paymentMethod,
        priceId,
    }: CreateSubscriptionRequestDto): Promise<CreateSubscriptionResponseDto> {
        const customer = await this.createStripeCustomer(
            name,
            email,
            paymentMethod,
        );

        const subscription: Stripe.Subscription =
            await this.createStripeSubscription(customer.id, priceId);

        const { latest_invoice, id } = subscription;

        if (!latest_invoice || typeof latest_invoice === 'string') {
            return {
                clientSecret: null,
                subscriptionId: id,
            };
        }

        const { client_secret } =
            latest_invoice.payment_intent as Stripe.PaymentIntent;

        return {
            clientSecret: client_secret,
            subscriptionId: id,
        };
    }
}

export { PaymentService };
