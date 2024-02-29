import { type User } from '~/packages/user/user.js';

declare module 'fastify' {
    interface FastifyRequest {
        user?: User;
        rawBody?: string | null;
    }
}
