import { Guid as guid } from 'guid-typescript';

import { type ISubscriptionPlanRepository } from '~/bundles/stripe-events/interfaces/interfaces.js';
import {
    type SubscriptionPlan,
    type SubscriptionPlanCreateDto,
} from '~/bundles/stripe-events/types/types.js';

import { type SubscriptionPlanModel } from '../models/subscription-plan.model.js';

class SubscriptionPlanRepository implements ISubscriptionPlanRepository {
    private subscriptionPlanModel: typeof SubscriptionPlanModel;

    public constructor(subscriptionPlanModel: typeof SubscriptionPlanModel) {
        this.subscriptionPlanModel = subscriptionPlanModel;
    }

    public async find(query: {
        stripePlanId: string;
    }): Promise<SubscriptionPlan | undefined> {
        return await this.subscriptionPlanModel.query().findOne(query);
    }

    public async create(
        data: SubscriptionPlanCreateDto,
    ): Promise<SubscriptionPlan | undefined> {
        const newSubscriptionPlan = { ...data, id: guid.raw() };

        return await this.subscriptionPlanModel
            .query()
            .insert(newSubscriptionPlan)
            .returning('*');
    }

    public async delete({
        stripePlanId,
    }: {
        stripePlanId: string;
    }): Promise<boolean> {
        const response = await this.subscriptionPlanModel
            .query()
            .where({ stripePlanId })
            .delete();
        return !!response;
    }
}

export { SubscriptionPlanRepository };
