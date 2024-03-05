import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { UserApi } from './users-api.js';

const userApi = new UserApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { userApi };
export {
    type OauthConnectionEntityFields,
    type SocialMediaProfiles,
    type UserAuthResponse,
    type UserGetAllItemResponseDto,
    type UserGetAllResponseDto,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
    type UserWithProfileRelationAndOauthConnections,
} from './types/types.js';
export { userSignUpValidationSchema } from './validation-schemas/validation-schemas.js';
