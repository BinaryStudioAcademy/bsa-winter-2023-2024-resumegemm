import { rateLimit } from 'express-rate-limit';
import { type UserVerifyResetPasswordTokenRequestDto } from 'shared/build';

import { HttpCode } from '../http/http.js';
import { RESET_PASSWORD } from './constants/reset-password.js';

const resetPasswordLimiter = rateLimit({
    windowMs: RESET_PASSWORD.TIMEOUT,
    limit: RESET_PASSWORD.MAX_ATTEMPTS,
    statusCode: HttpCode.BAD_REQUEST,
    keyGenerator: (request: UserVerifyResetPasswordTokenRequestDto) =>
        request.email,
    skipSuccessfulRequests: true,
});

export { resetPasswordLimiter };
