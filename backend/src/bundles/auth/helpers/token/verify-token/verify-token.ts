import jwt, { type JwtPayload } from 'jsonwebtoken';

const verifyToken = (
    token: string,
    tokenSecret: string,
): JwtPayload | string => {
    return jwt.verify(token, tokenSecret);
};

export { verifyToken };
