import { StripeEventsController } from '~/bundles/stripe-events/stripe-events.controller.js';
import { StripeEventsService } from '~/bundles/stripe-events/stripe-events.service.js';
import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';

import { stripeEventDispatcher } from './handlers/handlers.js';

const stripeEventsService = new StripeEventsService(
    config,
    stripeEventDispatcher,
);

const stripeEventsController = new StripeEventsController(
    logger,
    stripeEventsService,
);

export { stripeEventsController, stripeEventsService };
