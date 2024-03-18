import { SubscriptionStatus } from './enums/enums.js';
import { type SubscriptionModel } from './subscription.model';
import {
    type CreateSubscription,
    type FindSubscriptionQueryResult,
    type ISubscriptionRepository,
    type Subscription,
    type SubscriptionResponseDto,
    type SubscriptionWithPlan,
} from './types/types';

class SubscriptionRepository implements ISubscriptionRepository {
    private subscriptionModel: typeof SubscriptionModel;

    public constructor(subscriptionModel: typeof SubscriptionModel) {
        this.subscriptionModel = subscriptionModel;
    }

    public async findUserSubscription(
        userId: string,
    ): Promise<SubscriptionWithPlan> {
        const subscriptions = (await this.subscriptionModel
            .query()
            .where('user_id', userId)
            .withGraphFetched('subscriptionPlan')
            .returning('*')) as FindSubscriptionQueryResult[];

        return subscriptions[0] ?? null;
    }

    public async findById(id: string): Promise<Subscription> {
        return await this.subscriptionModel
            .query()
            .findOne('id', id)
            .returning('*');
    }

    public async create(data: CreateSubscription): Promise<Subscription> {
        return await this.subscriptionModel.query().insert(data).returning('*');
    }

    public async updateStatus(
        id: string,
        status: string,
    ): Promise<Subscription> {
        const result = await this.subscriptionModel
            .query()
            .where('subscription_id', id)
            .update({ status })
            .returning('*');

        return result[0];
    }

    public async update(
        id: string,
        data: Partial<Subscription>,
    ): Promise<SubscriptionWithPlan> {
        const subscriptions = (await this.subscriptionModel
            .query()
            .where('id', id)
            .update(data)
            .withGraphFetched('subscriptionPlan')
            .returning('*')) as FindSubscriptionQueryResult[];

        return subscriptions[0] ?? null;
    }

    public async delete(id: string): Promise<boolean> {
        const response = await this.subscriptionModel.query().deleteById(id);

        return Boolean(response);
    }
}

export { SubscriptionRepository };
