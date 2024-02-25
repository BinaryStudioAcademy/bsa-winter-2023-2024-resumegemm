import { logger } from '~/common/logger/logger.js';

import { userService } from '../users/users.js';
import { EmailSubscriptionRepository } from './email-subscriprion.repository.js';
import { EmailSubscriptionController } from './email-subscription.controller.js';
import { EmailSubscriptionModel } from './email-subscription.model.js';
import { EmailSubscriptionService } from './email-subscription.service.js';

const emailSubscriptionRepository = new EmailSubscriptionRepository(
    EmailSubscriptionModel,
);

const emailSubscriptionService = new EmailSubscriptionService(
    emailSubscriptionRepository,
    userService,
);

const emailSubscriptionController = new EmailSubscriptionController(
    logger,
    emailSubscriptionService,
);

export { emailSubscriptionController };
