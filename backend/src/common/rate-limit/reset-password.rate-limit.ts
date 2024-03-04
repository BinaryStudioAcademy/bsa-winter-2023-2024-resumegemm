import { rateLimit } from 'express-rate-limit';
import { type UserVerifyResetTokenRequestDto } from 'shared/build';

import { HttpCode } from '../http/http.js';
import { RESET_PASSWORD } from './constants/reset-password.js';

const resetPasswordLimiter = rateLimit({
    windowMs: RESET_PASSWORD.TIMEOUT,
    limit: RESET_PASSWORD.MAX_ATTEMPTS,
    statusCode: HttpCode.BAD_REQUEST,
    keyGenerator: (request: UserVerifyResetTokenRequestDto) => request.email,
    skipSuccessfulRequests: true,
});

export { resetPasswordLimiter };
