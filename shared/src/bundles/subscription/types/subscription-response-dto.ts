import { type SubscriptionPlan } from '../../stripe-events/types/types.js';

type SubscriptionResponseDto = {
    id: string;
    status: string;
    isCancelled: boolean;
    subscriptionId: string;
    subscriptionPlanId: string;
    userId: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    subscriptionPlan: SubscriptionPlan;
};

export { type SubscriptionResponseDto };
