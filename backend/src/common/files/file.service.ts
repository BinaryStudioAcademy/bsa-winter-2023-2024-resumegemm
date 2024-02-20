import { type FileUploadResponseDto } from 'shared/build/types/file-upload-response.dto.type.js';

import { type IService } from '../interfaces/service.interface.js';
import { FileEntity } from './file.entity.js';
import { type FileRepository } from './file.repository.js';
import { type IFileUploadClient } from './interfaces/file-upload-client.interface.js';
import { type FileUploadRequestDto } from './types/file-upload-request-dto.js';

class FileService {
    private fileRepository: FileRepository;
    private fileUploadClient: IFileUploadClient;

    public constructor(
        userRepository: FileRepository,
        fileUploadClient: IFileUploadClient,
    ) {
        this.fileRepository = userRepository;
        this.fileUploadClient = fileUploadClient;
    }

    public async create(
        fileBuffer: FileUploadRequestDto,
    ): Promise<FileUploadResponseDto> {
        const uploadedFileUrl = await this.fileUploadClient.upload(
            fileBuffer.buffer,
            fileBuffer.contentType,
        );

        const fileEntity = await this.fileRepository.create(
            FileEntity.initializeNew({ url: uploadedFileUrl }),
        );

        return fileEntity.toObject();
    }

    public find(): ReturnType<IService['find']> {
        return Promise.resolve(null);
    }

    public findAll(): ReturnType<IService['findAll']> {
        return Promise.resolve({ items: [] });
    }

    public update(): ReturnType<IService['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<IService['delete']> {
        return Promise.resolve(true);
    }
}

export { FileService };
