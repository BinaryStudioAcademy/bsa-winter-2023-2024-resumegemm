import { SubscriptionPlanModel } from '~/bundles/stripe-events/models/subscription-plan.model.js';
import { SubscriptionPlanRepository } from '~/bundles/stripe-events/repositories/subscription-plan.repository.js';
import { StripeEventsController } from '~/bundles/stripe-events/stripe-events.controller.js';
import { StripeEventsService } from '~/bundles/stripe-events/stripe-events.service.js';
import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';

const subscriptionPlanRepository = new SubscriptionPlanRepository(
    SubscriptionPlanModel,
);

const stripeEventsService = new StripeEventsService(
    config,
    subscriptionPlanRepository,
);

const stripeEventsController = new StripeEventsController(
    logger,
    stripeEventsService,
);

export { stripeEventsController, stripeEventsService };
