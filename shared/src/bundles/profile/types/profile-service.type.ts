import {
    type FileUploadRequestDto,
    type FileUploadResponseDto,
} from 'backend/src/common/files/types/types.js';

import { type Profile } from './profile-type';

interface IProfileService {
    uploadAvatar: ({
        id,
        fileBuffer,
    }: {
        id: string;
        fileBuffer: FileUploadRequestDto;
    }) => Promise<FileUploadResponseDto>;
    getAvatarUrl: (userProfile: Profile) => Promise<string | null>;
    deleteAvatar: (id: string) => Promise<void>;
}

export { type IProfileService };
