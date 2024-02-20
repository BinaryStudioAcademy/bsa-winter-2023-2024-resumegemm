import 'fastify';

import { type User } from '~/packages/user/user.js';

import { type FileUploadRequestDto } from './common/files/types/file-upload-request-dto';

declare module 'fastify' {
    interface FastifyRequest {
        user?: User;
        fileBuffer?: FileUploadRequestDto;
    }
}
