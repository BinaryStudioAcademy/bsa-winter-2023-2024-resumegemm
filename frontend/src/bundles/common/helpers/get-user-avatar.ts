import { type UserWithProfileRelation } from 'shared/build';

const getUserAvatart = (user: UserWithProfileRelation | null): string => {
    if (user?.user_profile.avatar) {
        return user.user_profile.avatar;
    }
    return '/src/assets/img/mock-avatar.png';
};

export { getUserAvatart };
