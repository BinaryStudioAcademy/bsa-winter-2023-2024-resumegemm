import { type SubscriptionPlan } from '../../stripe-events/types/subscription-plan.type';
import { type SubscriptionModel } from '../subscription.model';

interface FindSubscriptionQueryResult extends SubscriptionModel {
    subscriptionPlan: SubscriptionPlan;
}

export { type FindSubscriptionQueryResult };
