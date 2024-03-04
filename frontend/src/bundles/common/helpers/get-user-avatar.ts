import { type UserWithProfileRelation } from 'shared/build';

const getUserAvatar = (user: UserWithProfileRelation | null): string => {
    if (user?.userProfile.avatar) {
        return user.userProfile.avatar;
    }
    return '/src/assets/img/mock-avatar.png';
};

export { getUserAvatar };
