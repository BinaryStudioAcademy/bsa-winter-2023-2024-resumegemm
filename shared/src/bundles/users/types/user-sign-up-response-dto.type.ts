import { type Profile } from '../../profile/profile';
import { type UserAuthResponse } from './user-auth-response.type';

type UserSignUpResponseDto = {
    user: UserAuthResponse & { user_profile: Profile };
    accessToken: string;
};

export { type UserSignUpResponseDto };
