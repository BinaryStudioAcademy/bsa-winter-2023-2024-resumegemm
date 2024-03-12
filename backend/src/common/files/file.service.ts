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
        const { buffer, contentType, contentEncoding } = fileBuffer;

        return await this.fileUploadClient.upload({
            buffer,
            contentType,
            contentEncoding,
        });
    }

    public async getFileUrl(key: string): Promise<string> {
        return await this.fileUploadClient.getFileUrl(key);
    }
}

export { FileService };
