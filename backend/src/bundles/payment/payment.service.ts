import { HttpCode, HTTPError } from 'shared/build/index.js';
import Stripe from 'stripe';

import { type IConfig } from '~/common/config/config';

import { paymentMethodService } from '../payment-method/payment-method.js';
import { subscriptionPlanRepository } from '../stripe-events/repositories/subscription-plan.repository.js';
import { subscriptionService } from '../subscription/subscription.js';
import { type UserService } from '../users/user.service.js';
import { PaymentErrorMessage } from './enums/error-message.js';
import { getCardExpireDate, mapPrices } from './helpers/helpers.js';
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
    private userService: UserService;

    public constructor(config: IConfig, userService: UserService) {
        this.appConfig = config;
        this.stripe = new Stripe(this.appConfig.ENV.STRIPE.STRIPE_SECRET_KEY);
        this.userService = userService;
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
            throw new HTTPError({
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
            return this.stripe.customers.create({
                name: name,
                email: email,
                payment_method: paymentMethod,
                invoice_settings: {
                    default_payment_method: paymentMethod,
                },
            });
        } catch {
            throw new HTTPError({
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
            throw new HTTPError({
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

        const { latest_invoice, id, status } = subscription;

        if (!latest_invoice || typeof latest_invoice === 'string') {
            return {
                clientSecret: null,
                subscriptionId: id,
            };
        }
        const { client_secret, payment_method } =
            latest_invoice.payment_intent as Stripe.PaymentIntent;

        const retrievedSubscription = await this.stripe.subscriptions.retrieve(
            id,
        );
        const { current_period_start, current_period_end, items } =
            retrievedSubscription;

        const startDate = new Date(current_period_start * 1000);
        const endDate = new Date(current_period_end * 1000);

        const { id: stripePlanId } = items.data[0].plan;
        const subscriptionPlan =
            await subscriptionPlanRepository.findByStripePlanId(stripePlanId);

        const customerId = customer.id;
        const user = await this.userService.addStripeId(customerId, email);

        const paymentMethodId = payment_method?.toString();

        if (paymentMethodId) {
            const { card } = await this.stripe.paymentMethods.retrieve(
                paymentMethodId,
            );

            if (card && user) {
                const { last4 } = card;
                const expireDate = getCardExpireDate(card);

                const newPaymentMethod = {
                    paymentMethodId,
                    card: last4,
                    expireDate,
                    userId: user.id,
                };
                await paymentMethodService.create(newPaymentMethod);
            }
        }

        if (user && subscriptionPlan) {
            const newSubscription = {
                subscriptionId: id,
                userId: user.id,
                status: status,
                subscriptionPlanId: subscriptionPlan.id,
                startDate,
                endDate,
            };
            await subscriptionService.create(newSubscription);
        }

        return {
            clientSecret: client_secret,
            subscriptionId: id,
        };
    }
}

export { PaymentService };
