import { type SocialMediaProfiles } from '~/bundles/users/users';

const updatedSocialMediaProfiles = (
    socialMediaProfiles: SocialMediaProfiles[],
    id: string,
): SocialMediaProfiles[] => {
    return socialMediaProfiles.map((socialProfile) => ({
        ...socialProfile,
        connected: socialProfile.id === id ? false : socialProfile.connected,
        id: socialProfile.id === id ? null : socialProfile.id,
    }));
};

export { updatedSocialMediaProfiles };
