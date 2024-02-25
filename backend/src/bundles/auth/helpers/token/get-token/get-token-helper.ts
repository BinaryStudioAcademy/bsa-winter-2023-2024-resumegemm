import { type FastifyRequest } from 'fastify';
import { HttpHeader } from 'shared/build/index.js';

const getToken = (headers: FastifyRequest['headers']): string | null => {
    const authHeader = headers[HttpHeader.AUTHORIZATION] as string;

    return authHeader ? authHeader.split(' ')[1] : null;
};

export { getToken };
