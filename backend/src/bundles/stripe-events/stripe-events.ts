import { SubscriptionPlanModel } from '~/bundles/stripe-events/models/subscription-plan.model.js';
import { SubscriptionPlanRepository } from '~/bundles/stripe-events/repositories/subscription-plan.repository.js';
import { StripeEventsController } from '~/bundles/stripe-events/stripe-events.controller.js';
import { StripeEventsService } from '~/bundles/stripe-events/stripe-events.service.js';
import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';

import { PaymentMethodModel } from './models/models';
import { PaymentMethodRepository } from './repositories/payment-method.repository';

const subscriptionPlanRepository = new SubscriptionPlanRepository(
    SubscriptionPlanModel,
);

const paymentMethodRepository = new PaymentMethodRepository(PaymentMethodModel);

const stripeEventsService = new StripeEventsService(
    config,
    subscriptionPlanRepository,
    paymentMethodRepository,
);

const stripeEventsController = new StripeEventsController(
    logger,
    stripeEventsService,
);

export { stripeEventsController, stripeEventsService };
