import { type UserWithRelations } from '~/bundles/users/types/types.js';

const getUserAvatart = (user: UserWithRelations | null): string => {
    if (user?.user_profile.avatar) {
        return user.user_profile.avatar;
    }
    return '/src/assets/img/mock-avatar.png';
};

export { getUserAvatart };
