import { type UserWithProfileRelation } from 'shared/build';

import defaultAvatar from '~/assets/img/default-avatar-icon.png';

const getUserAvatart = (user: UserWithProfileRelation | null): string => {
    if (user?.user_profile.avatar) {
        return user.user_profile.avatar;
    }
    return defaultAvatar;
};

export { getUserAvatart };
