import jwt from 'jsonwebtoken';

import { config } from '~/common/config/config.js';

const generateRefreshToken = <T extends object>(data: T): string => {
    const {
        JWT: { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN },
    } = config.ENV;

    return jwt.sign(data, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });
};

export { generateRefreshToken };
