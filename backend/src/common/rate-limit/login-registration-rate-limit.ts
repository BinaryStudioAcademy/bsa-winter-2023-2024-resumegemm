import { rateLimit } from 'express-rate-limit';
import { HttpCode } from 'shared/build/index.js';

import { MemoryStore } from '~/common/rate-limit/store/memory-store.js';

const memoryStore = new MemoryStore();

const loginRegistrationRateLimiter = rateLimit({
    statusCode: HttpCode.BAD_REQUEST,
    store: memoryStore,
});

export { loginRegistrationRateLimiter, memoryStore };
