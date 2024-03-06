import { userService } from '~/bundles/users/users.js';
import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';

import { PaymentController } from './payment.controller.js';
import { PaymentService } from './payment.service.js';

const paymentService = new PaymentService(config, userService);
const paymentController = new PaymentController(logger, paymentService);

export { paymentController, paymentService };
