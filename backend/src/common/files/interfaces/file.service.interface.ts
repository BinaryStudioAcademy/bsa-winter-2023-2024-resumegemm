import { type DeleteObjectCommandOutput } from '@aws-sdk/client-s3';

import {
    type FileUploadRequestDto,
    type FileUploadResponseDto,
} from '../types/types.js';

interface IFileService {
    create(fileBuffer: FileUploadRequestDto): Promise<FileUploadResponseDto>;
    getFileUrl(key: string): Promise<string>;
    delete(key: string): Promise<DeleteObjectCommandOutput>;
}

export { type IFileService };
