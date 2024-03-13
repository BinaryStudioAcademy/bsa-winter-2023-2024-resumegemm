import { Guid as guid } from 'guid-typescript';

import {
    type Subscription,
    type SubscriptionCreateDto,
} from '~/bundles/stripe-events/types/types.js';

import { type ISubscriptionRepository } from '../interfaces/subscription-repository.interface.js';
import { type CurrentSubscriptionModel } from '../models/current-subscription.model.js';

class CurrentSubscriptionRepository implements ISubscriptionRepository {
    private currentSubscriptionModel: typeof CurrentSubscriptionModel;

    public constructor(
        currentSubscriptionModel: typeof CurrentSubscriptionModel,
    ) {
        this.currentSubscriptionModel = currentSubscriptionModel;
    }

    public async find(query: {
        customerId: string;
    }): Promise<CurrentSubscriptionModel | undefined> {
        return await this.currentSubscriptionModel
            .query()
            .findOne(query)
            .where({ isActive: true });
    }

    public async create(data: SubscriptionCreateDto): Promise<Subscription> {
        const {
            customerId,
            subscriptionId,
            currentPeriodStart,
            currentPeriodEnd,
        } = data;
        const MILLIS_TO_SECOND = 1000;
        const newSubscription = {
            id: guid.raw(),
            isActive: true,
            subscriptionDateStart: new Date(
                currentPeriodStart * MILLIS_TO_SECOND,
            ),
            subscriptionDateEnd: new Date(currentPeriodEnd * MILLIS_TO_SECOND),
            customerId,
            subscriptionId,
        };

        return await this.currentSubscriptionModel
            .query()
            .insert(newSubscription)
            .returning('*')
            .castTo<Subscription>();
    }

    public async delete(customerId: string): Promise<Subscription> {
        return await this.currentSubscriptionModel
            .query()
            .where({ customerId })
            .patch({ isActive: false })
            .returning('*')
            .castTo<Subscription>();
    }
}

export { CurrentSubscriptionRepository };
