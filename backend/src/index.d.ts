import 'fastify';

import  { type FileUploadRequestDto } from './common/files/types/file-upload-request-dto';

declare module 'fastify' {
  interface FastifyRequest {
    fileBuffer?: FileUploadRequestDto;
  }
}