import { type UserWithProfileRelation } from 'shared/build';

const getUserAvatart = (user: UserWithProfileRelation | null): string => {
    if (user?.userProfile.avatar) {
        return user.userProfile.avatar;
    }
    return '/src/assets/img/mock-avatar.png';
};

export { getUserAvatart };
