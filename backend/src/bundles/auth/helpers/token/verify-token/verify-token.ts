import jwt, { type JwtPayload } from 'jsonwebtoken';

import { config } from '~/common/config/config';

const verifyToken = (token: string): JwtPayload | string => {
    return jwt.verify(token, config.ENV.JWT.SECRET);
};

export { verifyToken };
