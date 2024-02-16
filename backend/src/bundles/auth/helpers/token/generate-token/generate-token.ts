import jwt from 'jsonwebtoken';

import { config } from '~/common/config/config.js';

const generateToken = <T extends object>(data: T): string => {
    return jwt.sign(data, config.ENV.JWT.SECRET, {
        expiresIn: config.ENV.JWT.EXPIRES_IN,
    });
};

export { generateToken };
