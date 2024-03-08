import defaultAvatar from '~/assets/img/default-avatar-icon.png';
import { type UserWithRelations } from '~/bundles/users/types/types.js';

const getUserAvatar = (user: UserWithRelations | null): string => {
    if (user?.userProfile.avatar) {
        return user.userProfile.avatar;
    }
    return defaultAvatar;
};

export { getUserAvatar };
