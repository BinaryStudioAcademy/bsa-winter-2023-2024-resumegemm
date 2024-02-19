import { type FastifyRequest } from 'fastify';
import { HttpHeader } from 'shared/build/index.js';

const getToken = (headers: FastifyRequest['headers']): string => {
    return (headers[HttpHeader.AUTHORIZATION] as string).split(' ')[1];
};

export { getToken };
