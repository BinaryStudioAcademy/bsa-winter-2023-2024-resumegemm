import Stripe from 'stripe';

import { type IConfig } from '~/common/config/interfaces/config.interface.js';
import { MailService } from '~/common/mail-service/mail-service.package.js';

import { EmailSubject } from '../enums/email-subject.enum.js';
import { generateSubscriptionEmailPayload } from '../helpers/subscription-email-generator.js';
import { type IEventHandler } from '../interfaces/interfaces';
import { type CurrentSubscriptionRepository } from '../repositories/current-subscription.repository.js';
import {
    type StripeCustomer,
    type Subscription,
    type SubscriptionCreateDto,
    type SubscriptionDetails,
} from '../types/types';

class SubscriptionCreatedEventHandler
    implements IEventHandler<Stripe.CustomerSubscriptionCreatedEvent.Data>
{
    private mailService: MailService;
    private subscriptionRepository: CurrentSubscriptionRepository;
    private stripe: Stripe;
    private appConfig: IConfig;

    public constructor(
        config: IConfig,
        subscriptionRepository: CurrentSubscriptionRepository,
    ) {
        this.appConfig = config;
        this.stripe = new Stripe(
            this.appConfig.ENV.STRIPE.STRIPE_WEBHOOK_SECRET,
        );
        this.mailService = MailService.getInstance();
        this.subscriptionRepository = subscriptionRepository;
    }

    public async handle(
        data: Stripe.CustomerSubscriptionCreatedEvent.Data,
    ): Promise<void> {
        const subscription: Stripe.Subscription = data.object;
        const customerId = subscription.customer as string;
        const subscriptionId = subscription.id;
        const customer = (await this.stripe.customers.retrieve(
            customerId,
        )) as StripeCustomer;
        const {
            current_period_start: currentPeriodStart,
            current_period_end: currentPeriodEnd,
        } = subscription;
        const { name, email } = customer;
        void this.sendNotification({
            email,
            subject: EmailSubject.SUBSCRIPTION,
            name,
            currentPeriodStart,
            currentPeriodEnd,
        });
        void this.saveSubscription({
            customerId,
            subscriptionId,
            currentPeriodStart,
            currentPeriodEnd,
        });
    }

    private async saveSubscription(
        subscription: SubscriptionCreateDto,
    ): Promise<Subscription> {
        return this.subscriptionRepository.create(subscription);
    }

    private async sendNotification(
        subscription: SubscriptionDetails,
    ): Promise<void> {
        const emailPayload = generateSubscriptionEmailPayload(subscription);
        await this.mailService.sendMail(emailPayload);
    }
}

export { SubscriptionCreatedEventHandler };
