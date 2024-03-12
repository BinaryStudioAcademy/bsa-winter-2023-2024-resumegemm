import { type Profile, ProfileApiPath } from 'shared/build/index.js';

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
    ): Promise<Pick<Profile, 'avatar'>> {
        const response = await this.load(
            this.getFullEndpoint(ProfileApiPath.UPLOAD_AVATAR, {}),
            {
                method: 'POST',
                contentType: ContentType.FORM_DATA,
                hasAuth: true,
                payload,
            },
        );

        return await response.json<Pick<Profile, 'avatar'>>();
    }

    public async deleteUserAvatar(): Promise<Pick<Profile, 'avatar'>> {
        const response = await this.load(
            this.getFullEndpoint(ProfileApiPath.DELETE_AVATAR, {}),
            {
                method: 'DELETE',
                contentType: ContentType.TEXT_PLAIN,
                hasAuth: true,
            },
        );

        return await response.json<Pick<Profile, 'avatar'>>();
    }
}

export { ProfileApi };
