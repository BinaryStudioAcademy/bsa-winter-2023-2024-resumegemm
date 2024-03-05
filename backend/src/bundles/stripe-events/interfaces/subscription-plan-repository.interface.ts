import { type SubscriptionPlan } from '~/bundles/stripe-events/types/subscription-plan.type.js';
import { type SubscriptionPlanCreateDto } from '~/bundles/stripe-events/types/subscription-plan-create-dto.type.js';

interface ISubscriptionPlanRepository {
    create(
        data: SubscriptionPlanCreateDto,
    ): Promise<SubscriptionPlan | undefined>;
}

export { type ISubscriptionPlanRepository };
