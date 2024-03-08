import jwt, { type JwtPayload } from 'jsonwebtoken';

const decodeToken = (token: string): JwtPayload | string | null => {
    return jwt.decode(token);
};

export { decodeToken };
