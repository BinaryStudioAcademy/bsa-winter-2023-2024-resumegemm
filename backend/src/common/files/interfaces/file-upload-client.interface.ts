import { type DeleteObjectCommandOutput } from '@aws-sdk/client-s3';

import { type FileUploadRequestDto } from '../types/file-upload-request-dto.type';
import { type FileUploadResponseDto } from '../types/file-upload-response-dto-type';

interface IFileUploadClient {
    upload({
        buffer,
        contentType,
    }: FileUploadRequestDto): Promise<FileUploadResponseDto>;
    getFileUrl(key: string): Promise<string>;
    delete(key: string): Promise<DeleteObjectCommandOutput>;
}

export { type IFileUploadClient };
