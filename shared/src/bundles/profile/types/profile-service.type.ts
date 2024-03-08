import {
    type FileUploadRequestDto,
    type FileUploadResponseDto,
} from 'backend/src/common/files/types/types.js';

interface IProfileService {
    uploadAvatar: ({
        id,
        fileBuffer,
    }: {
        id: string;
        fileBuffer: FileUploadRequestDto;
    }) => Promise<FileUploadResponseDto>;
    deleteAvatar: (id: string) => unknown;
}

export { type IProfileService };
