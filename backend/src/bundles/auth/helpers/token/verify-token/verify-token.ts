import jwt, { type JwtPayload } from 'jsonwebtoken';

import { config } from '~/common/config/config.js';

const verifyToken = (
    token: string,
    isRefreshToken?: boolean,
): JwtPayload | string => {
    const secretToVerify = isRefreshToken
        ? config.ENV.JWT.REFRESH_TOKEN_SECRET
        : config.ENV.JWT.ACCESS_TOKEN_SECRET;
    return jwt.verify(token, secretToVerify);
};

export { verifyToken };
