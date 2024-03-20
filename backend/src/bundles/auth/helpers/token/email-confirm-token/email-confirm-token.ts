import jwt from 'jsonwebtoken';

import { config } from '~/common/config/config.js';

const generateEmailConfirmToken = <T extends object>(data: T): string => {
    const {
        JWT: { EMAIL_CONFIRM_TOKEN_SECRET, EMAIL_CONFIRM_TOKEN_EXPIRES_IN },
    } = config.ENV;
    return jwt.sign(data, EMAIL_CONFIRM_TOKEN_SECRET, {
        expiresIn: EMAIL_CONFIRM_TOKEN_EXPIRES_IN,
    });
};

export { generateEmailConfirmToken };
