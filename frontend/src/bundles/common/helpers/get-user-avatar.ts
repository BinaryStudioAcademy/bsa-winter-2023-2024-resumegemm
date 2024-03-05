import { type UserWithProfileRelationAndOauthConnections } from 'shared/build';

const getUserAvatar = (
    user: UserWithProfileRelationAndOauthConnections | null,
): string => {
    if (user?.profile.avatar) {
        return user.profile.avatar;
    }
    return '/src/assets/img/mock-avatar.png';
};

export { getUserAvatar };
