import { type SubscriptionPlan } from '../../stripe-events/types/subscription-plan.type';

type SubscriptionWithPlan = {
    id: string;
    status: string;
    isCancelled: boolean;
    subscriptionId: string;
    subscriptionPlanId: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    createdAt: string;
    updatedAt: string;
    subscriptionPlan: SubscriptionPlan;
};

export { type SubscriptionWithPlan };
