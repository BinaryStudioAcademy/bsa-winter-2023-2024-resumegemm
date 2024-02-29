import jwt from 'jsonwebtoken';

import { config } from '~/common/config/config.js';

const generateResetToken = <T extends object>(data: T): string => {
    const {
        JWT: { RESET_TOKEN_SECRET, RESET_TOKEN_EXPIRES_IN },
    } = config.ENV;

    return jwt.sign(data, RESET_TOKEN_SECRET, {
        expiresIn: RESET_TOKEN_EXPIRES_IN,
    });
};

export { generateResetToken };
