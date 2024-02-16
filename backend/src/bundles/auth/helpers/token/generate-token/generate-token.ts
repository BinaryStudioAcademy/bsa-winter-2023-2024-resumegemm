import jwt from 'jsonwebtoken';

import { config } from '~/common/config/config.js';

const generateToken = <T extends object>(
    data: T,
    isRefreshToken?: boolean,
): string => {
    const {
        JWT: {
            ACCESS_TOKEN_SECRET,
            REFRESH_TOKEN_SECRET,
            ACCESS_TOKEN_EXPIRES_IN,
            REFRESH_TOKEN_EXPIRES_IN,
        },
    } = config.ENV;

    const expiresIn = isRefreshToken
        ? REFRESH_TOKEN_EXPIRES_IN
        : ACCESS_TOKEN_EXPIRES_IN;
    const secret = isRefreshToken ? REFRESH_TOKEN_SECRET : ACCESS_TOKEN_SECRET;
    return jwt.sign(data, secret, {
        expiresIn,
    });
};

export { generateToken };
