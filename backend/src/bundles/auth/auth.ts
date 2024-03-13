import { userService } from '~/bundles/users/users.js';
import { logger } from '~/common/logger/logger.js';
import { mailService } from '~/common/mail-service/mail-service.js';

import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

const authService = new AuthService(userService);
const authController = new AuthController(logger, authService, mailService);

export { authController, authService };
