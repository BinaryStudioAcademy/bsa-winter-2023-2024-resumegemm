import { type Profile } from '~/bundles/profile/types/profile-type.js';

import { type User } from './user.type';

type UserWithProfileRelation = User & {
    userProfile: Profile;
};

export { type UserWithProfileRelation };
