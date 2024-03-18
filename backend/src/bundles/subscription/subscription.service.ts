import Stripe from 'stripe';

import { type IConfig } from '~/common/config/config';

import { formatSubscriptionDate } from './helpers/helpers.js';
import { type SubscriptionRepository } from './subscription.repository';
import {
    type CreateSubscription,
    type ISubscriptionService,
    type Subscription,
    type SubscriptionResponseDto,
} from './types/types';

class SubscriptionService implements ISubscriptionService {
    private subscriptionRepository: SubscriptionRepository;
    private appConfig: IConfig;
    private stripe: Stripe;

    public constructor(
        appConfig: IConfig,
        subscriptionRepository: SubscriptionRepository,
    ) {
        this.subscriptionRepository = subscriptionRepository;
        this.appConfig = appConfig;
        this.stripe = new Stripe(this.appConfig.ENV.STRIPE.STRIPE_SECRET_KEY);
    }

    public async find(userId: string): Promise<SubscriptionResponseDto | null> {
        const subscription =
            await this.subscriptionRepository.findUserSubscription(userId);

        if (subscription) {
            return formatSubscriptionDate(subscription);
        }

        return null;
    }

    public async findById(id: string): Promise<Subscription | null> {
        return await this.subscriptionRepository.findById(id);
    }

    public async create(data: CreateSubscription): Promise<Subscription> {
        return await this.subscriptionRepository.create(data);
    }

    public async updateStatus(
        id: string,
        status: string,
    ): Promise<Subscription> {
        return await this.subscriptionRepository.updateStatus(id, status);
    }

    public async cancelSubscription(
        id: string,
    ): Promise<SubscriptionResponseDto> {
        const subscription = await this.subscriptionRepository.findById(id);

        await this.stripe.subscriptions.update(subscription.subscriptionId, {
            cancel_at_period_end: true,
        });

        const updatedSubscription = await this.subscriptionRepository.update(
            id,
            {
                isCancelled: true,
            },
        );

        return formatSubscriptionDate(updatedSubscription);
    }

    public async keepSubscription(
        id: string,
    ): Promise<SubscriptionResponseDto> {
        const subscription = await this.subscriptionRepository.findById(id);

        await this.stripe.subscriptions.update(subscription.subscriptionId, {
            cancel_at_period_end: false,
        });

        const updatedSubscription = await this.subscriptionRepository.update(
            id,
            {
                isCancelled: false,
            },
        );

        return formatSubscriptionDate(updatedSubscription);
    }
}

export { SubscriptionService };
