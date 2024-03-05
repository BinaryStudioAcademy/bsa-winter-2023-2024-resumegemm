import { type UpdateUserProfileAndEmailRequestDto } from 'shared/build/index.js';

import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import { UsersApiPath } from './enums/enums.js';
import {
    type UserGetAllResponseDto,
    type UserWithProfileRelationAndOauthConnections,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class UserApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USERS, baseUrl, http, storage });
    }

    public async getAll(): Promise<UserGetAllResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(UsersApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<UserGetAllResponseDto>();
    }

    public async updateProfileAndEmail(
        id: string,
        payload: UpdateUserProfileAndEmailRequestDto,
    ): Promise<UserWithProfileRelationAndOauthConnections> {
        const response = await this.load(
            this.getFullEndpoint(`${UsersApiPath.ROOT}/${id}`, {}),
            {
                method: 'PUT',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return await response.json<UserWithProfileRelationAndOauthConnections>();
    }
}

export { UserApi };
