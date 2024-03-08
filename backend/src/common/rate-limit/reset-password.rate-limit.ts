import { rateLimit } from 'express-rate-limit';

import { HttpCode } from '../http/http.js';
import { RetrySettings } from './enums/retry-settings.js';

const resetPasswordLimiter = rateLimit({
    windowMs: RetrySettings.TIMEOUT,
    limit: RetrySettings.MAX_ATTEMPTS,
    statusCode: HttpCode.BAD_REQUEST,
    skipSuccessfulRequests: true,
});

export { resetPasswordLimiter };
