import { SubscriptionPlanModel } from '~/bundles/stripe-events/models/subscription-plan.model.js';
import { SubscriptionPlanRepository } from '~/bundles/stripe-events/repositories/subscription-plan.repository.js';
import { SubscriptionModel } from '~/bundles/subscription/subscription.model.js';
import { SubscriptionRepository } from '~/bundles/subscription/subscription.repository.js';
import { config } from '~/common/config/config.js';

import { StripeEvents } from '../enums/stripe-events.enum.js';
import { StripeEventDispatcher } from './stripe-event-dispatcher.js';
import { SubscriptionCreatedEventHandler } from './subscription-created-event-handler.js';
import { SubscriptionPlanCreatedEventHandler } from './subscription-plan-created-event-handler.js';
import { SubscriptionPlanDeletedEventHandler } from './subscription-plan-deleted-event-handler.js';
import { SubscriptionStatusUpdateEventHandler } from './subscription-status-update-event-handler.js';

const subscriptionPlanRepository = new SubscriptionPlanRepository(
    SubscriptionPlanModel,
);
const subscriptionRepository = new SubscriptionRepository(SubscriptionModel);

const subscriptionPlanCreatedEventHandler =
    new SubscriptionPlanCreatedEventHandler(subscriptionPlanRepository, config);

const subscriptionUpdateStatusEventHandler =
    new SubscriptionStatusUpdateEventHandler(subscriptionRepository);

const subscriptionPlanDeletedEventHandler =
    new SubscriptionPlanDeletedEventHandler(subscriptionPlanRepository);

const subscriptionCreatedEventHandler = new SubscriptionCreatedEventHandler(
    config,
);

const stripeEventDispatcher = new StripeEventDispatcher();

stripeEventDispatcher.registerHandler(
    StripeEvents.PLAN_CREATED,
    subscriptionPlanCreatedEventHandler,
);
stripeEventDispatcher.registerHandler(
    StripeEvents.PLAN_DELETED,
    subscriptionPlanDeletedEventHandler,
);
stripeEventDispatcher.registerHandler(
    StripeEvents.SUBSCRIPTION_CREATED,
    subscriptionCreatedEventHandler,
);
stripeEventDispatcher.registerHandler(
    StripeEvents.SUBSCRIPTION_UPDATED,
    subscriptionUpdateStatusEventHandler,
);

export { stripeEventDispatcher };
