import { type UserProfileResponce } from 'shared/build/bundles/profile/types/user-profile-response.type';

import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class ProfileApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.PROFILE, baseUrl, http, storage });
    }

    public async updateUserAvatar(
        payload: FormData,
    ): Promise<UserProfileResponce> {
        const response = await this.load(
            this.getFullEndpoint(ApiPath.AVATAR, {}),
            {
                method: 'PUT',
                contentType: ContentType.FORM_DATA,
                hasAuth: true,
                payload,
            },
        );

        return await response.json<UserProfileResponce>();
    }
}

export { ProfileApi };
