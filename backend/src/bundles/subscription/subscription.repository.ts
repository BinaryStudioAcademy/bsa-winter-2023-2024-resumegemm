import { type SubscriptionModel } from './subscription.model';
import {
    type CreateSubscription,
    type ISubscriptionRepository,
    type Subscription,
} from './types/types';

class SubscriptionRepository implements ISubscriptionRepository {
    private subscriptionModel: typeof SubscriptionModel;

    public constructor(subscriptionModel: typeof SubscriptionModel) {
        this.subscriptionModel = subscriptionModel;
    }

    public async findUserSubscription(
        userId: string,
    ): Promise<Subscription | null> {
        const subscriptions = await this.subscriptionModel
            .query()
            .where('user_id', userId)
            .returning('*');

        return subscriptions[0] ?? null;
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

    public async delete(id: string): Promise<boolean> {
        const response = await this.subscriptionModel.query().deleteById(id);

        return Boolean(response);
    }
}

export { SubscriptionRepository };