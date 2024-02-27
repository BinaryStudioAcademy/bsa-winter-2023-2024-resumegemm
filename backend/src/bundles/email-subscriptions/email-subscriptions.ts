import { logger } from '~/common/logger/logger.js';

import { userRepository } from '../users/users.js';
import { EmailSubscriptionController } from './email-subscription.controller.js';
import { EmailSubscriptionModel } from './email-subscription.model.js';
import { EmailSubscriptionRepository } from './email-subscription.repository.js';
import { EmailSubscriptionService } from './email-subscription.service.js';

const emailSubscriptionRepository = new EmailSubscriptionRepository(
    EmailSubscriptionModel,
);

const emailSubscriptionService = new EmailSubscriptionService(
    emailSubscriptionRepository,
    userRepository,
);

const emailSubscriptionController = new EmailSubscriptionController(
    logger,
    emailSubscriptionService,
);

export {
    emailSubscriptionController,
    emailSubscriptionRepository,
    emailSubscriptionService,
};
export { EmailSubscriptionModel } from './email-subscription.model.js';
export {
    type IEmailSubscriptionRepository,
    type IEmailSubscriptionService,
} from './types/types.js';
