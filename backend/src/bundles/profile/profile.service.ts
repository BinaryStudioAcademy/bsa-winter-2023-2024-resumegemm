import { type IProfileService, type Profile } from 'shared/build/index.js';

import { type IFileService } from '~/common/files/interfaces/file.service.interface.js';
import { type FileUploadRequestDto } from '~/common/files/types/types.js';

import { type ProfileRepository } from './profile.repository.js';

class ProfileService implements IProfileService {
    private fileService: IFileService;
    private profileRepository: ProfileRepository;

    public constructor(
        fileService: IFileService,
        profileRepository: ProfileRepository,
    ) {
        this.fileService = fileService;
        this.profileRepository = profileRepository;
    }

    public async uploadAvatar({
        fileBuffer,
        id,
    }: {
        fileBuffer: FileUploadRequestDto;
        id: string;
    }): ReturnType<IProfileService['uploadAvatar']> {
        const { url, key } = await this.fileService.create(fileBuffer);

        await this.profileRepository.uploadAvatar({ id, key });

        return { url, key };
    }

    public async getAvatarUrl(userProfile: Profile): Promise<string | null> {
        const { avatar } = userProfile;

        return avatar ? await this.fileService.getFileUrl(avatar) : null;
    }

    public async deleteAvatar(id: string): Promise<void> {
        const userProfile = await this.profileRepository.getById(id);

        const { avatar, id: profileId } = userProfile;

        if (avatar) {
            await this.profileRepository.deleteAvatar(profileId);
            await this.fileService.delete(avatar);
        }
    }
}

export { ProfileService };
