import { rateLimit } from 'express-rate-limit';

import { HttpCode } from '../http/http.js';
import { RESET_PASSWORD } from './enums/reset-password.js';

const resetPasswordLimiter = rateLimit({
    windowMs: RESET_PASSWORD.TIMEOUT,
    limit: RESET_PASSWORD.MAX_ATTEMPTS,
    statusCode: HttpCode.BAD_REQUEST,
    skipSuccessfulRequests: true,
});

export { resetPasswordLimiter };
