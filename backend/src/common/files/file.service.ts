import { type DeleteObjectCommandOutput } from '@aws-sdk/client-s3';

import { type IFileUploadClient } from './interfaces/file-upload-client.interface.js';
import {
    type FileUploadRequestDto,
    type FileUploadResponseDto,
} from './types/types.js';

class FileService {
    private fileUploadClient: IFileUploadClient;

    public constructor(fileUploadClient: IFileUploadClient) {
        this.fileUploadClient = fileUploadClient;
    }

    public async create(
        fileBuffer: FileUploadRequestDto,
    ): Promise<FileUploadResponseDto> {
        const { buffer, contentType } = fileBuffer;

        return await this.fileUploadClient.upload({
            buffer,
            contentType,
        });
    }

    public async getFileUrl(key: string): Promise<string> {
        return await this.fileUploadClient.getFileUrl(key);
    }

    public async delete(key: string): Promise<DeleteObjectCommandOutput> {
        return await this.fileUploadClient.delete(key);
    }
}

export { FileService };
