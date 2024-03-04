import { type OAuth2Namespace } from '@fastify/oauth2';

import { type User } from '~/packages/user/user.js';

import { type FileUploadRequestDto } from './common/files/types/types.js';

declare module 'fastify' {
    interface FastifyRequest {
        user?: User;
        rawBody?: string | null;
        fileBuffer?: FileUploadRequestDto;
    }
    interface FastifyInstance {
        github: OAuth2Namespace;
        google: OAuth2Namespace;
        facebook: OAuth2Namespace;
    }
}
