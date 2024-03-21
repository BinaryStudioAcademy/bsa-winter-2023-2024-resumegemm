import { type SubscriptionPlan } from '~/bundles/stripe-events/types/subscription-plan.type.js';
import { type SubscriptionPlanCreateDto } from '~/bundles/stripe-events/types/subscription-plan-create-dto.type.js';

interface ISubscriptionPlanService {
    create(
        data: SubscriptionPlanCreateDto,
    ): Promise<SubscriptionPlan | undefined>;
    find(stripePlanId: string): Promise<SubscriptionPlan | undefined>;
    delete(stripePlanId: string): Promise<boolean>;
}

export { type ISubscriptionPlanService };
