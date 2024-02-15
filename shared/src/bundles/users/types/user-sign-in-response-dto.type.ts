import { type Profile } from '../../profile/profile';
import { type UserAuthResponse } from './user-auth-response.type';

type UserSignInResponseDto = {
    user: UserAuthResponse & { user_profile: Profile };
    accessToken: string;
    refreshToken: string;
};

export { type UserSignInResponseDto };
