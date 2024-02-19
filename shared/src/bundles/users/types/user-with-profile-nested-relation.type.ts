import { type Profile } from '~/bundles/profile/types/profile-type.js';
import { type UserAuthResponse } from '~/bundles/users/types/user-auth-response.type.js';

type UserWithProfileRelation = UserAuthResponse & {
    user_profile: Profile;
};

export { type UserWithProfileRelation };
