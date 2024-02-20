import jwt from 'jsonwebtoken';

import { config } from '~/common/config/config.js';

const generateToken = <T extends object>(data: T): string => {
    const {
        JWT: { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN },
    } = config.ENV;

    return jwt.sign(data, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
};

export { generateToken };
