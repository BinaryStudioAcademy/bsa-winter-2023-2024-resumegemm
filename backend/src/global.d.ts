import { type OAuth2Namespace } from '@fastify/oauth2';

import { type User } from '~/packages/user/user.js';

declare module 'fastify' {
    interface FastifyRequest {
        user?: User;
    }
    interface FastifyInstance {
        github: OAuth2Namespace;
    }
}
