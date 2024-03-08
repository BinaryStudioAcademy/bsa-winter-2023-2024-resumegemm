import { OpenAuthApiPath } from 'shared/build/index.js';

import { config } from '~/common/config/config.js';

const cookieOptions = {
    path: OpenAuthApiPath.ROOT,
    maxAge: config.ENV.COOKIE.EXPIRES_IN,
    httpOnly: true,
    signed: true,
};

export { cookieOptions };
