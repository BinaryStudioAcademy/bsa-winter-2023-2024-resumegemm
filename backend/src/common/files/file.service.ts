import { type IFileUploadClient } from './interfaces/file-upload-client.interface.js';
import { type FileUploadRequestDto } from './types/file-upload-request-dto.type.js';
import { type FileUploadResponseDto } from './types/file-upload-response-dto.type.js';

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
