import { type UserWithRelations } from '~/bundles/users/types/types.js';

const getUserAvatar = (user: UserWithRelations | null): string => {
    if (user?.userProfile.avatar) {
        return user.userProfile.avatar;
    }
    return '/src/assets/img/mock-avatar.png';
};

export { getUserAvatar };
