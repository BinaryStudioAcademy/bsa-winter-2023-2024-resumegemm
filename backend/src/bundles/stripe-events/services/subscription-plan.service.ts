import {
    type SubscriptionPlan,
    type SubscriptionPlanCreateDto,
} from '~/bundles/stripe-events/types/types.js';

import { type ISubscriptionPlanService } from '../interfaces/subscription-plan.service.js';
import { type SubscriptionPlanRepository } from '../repositories/subscription-plan.repository.js';

class SubscriptionPlanService implements ISubscriptionPlanService {
    private subscriptionPlanRepository: SubscriptionPlanRepository;

    public constructor(subscriptionPlanRepository: SubscriptionPlanRepository) {
        this.subscriptionPlanRepository = subscriptionPlanRepository;
    }

    public async find(
        stripePlanId: string,
    ): Promise<SubscriptionPlan | undefined> {
        return await this.subscriptionPlanRepository.find({ stripePlanId });
    }

    public async create(
        data: SubscriptionPlanCreateDto,
    ): Promise<SubscriptionPlan | undefined> {
        return await this.subscriptionPlanRepository.create(data);
    }

    public async delete(stripePlanId: string): Promise<boolean> {
        return await this.subscriptionPlanRepository.delete({ stripePlanId });
    }
}

export { SubscriptionPlanService };
