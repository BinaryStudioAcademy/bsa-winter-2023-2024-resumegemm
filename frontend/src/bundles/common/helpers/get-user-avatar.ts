import { type UserWithProfileRelation } from 'shared/build';

import defaultAvatar from '~/assets/img/default-avatar-icon.png';

const getUserAvatar = (user: UserWithProfileRelation | null): string => {
    if (user?.userProfile.avatar) {
        return user.userProfile.avatar;
    }
    return defaultAvatar;
};

export { getUserAvatar };
