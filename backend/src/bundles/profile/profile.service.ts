import { type ProfileRepository } from '~/bundles/profile/profile.repository';
import { type IService } from '~/common/interfaces/service.interface';

class ProfileService implements Partial<IService> {
    private profileRepository: ProfileRepository;

    public constructor(profileRepository: ProfileRepository) {
        this.profileRepository = profileRepository;
    }

    public update(): Promise<unknown> {
        return Promise.resolve();
    }
}

export { ProfileService };
