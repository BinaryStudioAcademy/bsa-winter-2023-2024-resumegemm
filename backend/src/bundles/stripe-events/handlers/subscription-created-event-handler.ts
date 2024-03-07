import Stripe from 'stripe';

import { type IConfig } from '~/common/config/interfaces/config.interface.js';
import { MailService } from '~/common/mail-service/mail-service.package.js';

import { generateSubscriptionEmailPayload } from '../helpers/subscription-email-generator.js';
import { type IEventHandler } from '../interfaces/interfaces';
import { type StripeCustomer } from '../types/types';

class SubscriptionCreatedEventHandler
    implements IEventHandler<Stripe.CustomerSubscriptionCreatedEvent.Data>
{
    private mailService: MailService;
    private stripe: Stripe;
    private appConfig: IConfig;

    public constructor(config: IConfig) {
        this.appConfig = config;
        this.stripe = new Stripe(
            this.appConfig.ENV.STRIPE.STRIPE_WEBHOOK_SECRET,
        );
        this.mailService = MailService.getInstance();
    }

    public async handle(
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
        void this.mailService.sendMail(emailPayload);
    }
}

export { SubscriptionCreatedEventHandler };
