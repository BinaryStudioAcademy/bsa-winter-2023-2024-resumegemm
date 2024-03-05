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
        const uploadedFileUrl = await this.fileUploadClient.upload(
            fileBuffer.buffer,
            fileBuffer.contentType,
        );

        return { url: uploadedFileUrl };
    }
}

export { FileService };
