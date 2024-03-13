import {
    type UpdateUserProfileAndEmailRequestDto,
    type UserEntityFields,
} from 'shared/build/index.js';

import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import { UsersApiPath } from './enums/enums.js';
import {
    type UserGetAllResponseDto,
    type UserWithProfileRelation,
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

    public async deleteProfile(): Promise<UserEntityFields> {
        const response = await this.load(
            this.getFullEndpoint(`${UsersApiPath.ROOT}`, {}),
            {
                method: 'DELETE',
                contentType: ContentType.JSON,
                hasAuth: true,
                payload: JSON.stringify({}),
            },
        );

        return await response.json<UserEntityFields>();
    }

    public async updateProfileAndEmail(
        id: string,
        payload: UpdateUserProfileAndEmailRequestDto,
    ): Promise<UserWithProfileRelation> {
        const response = await this.load(
            this.getFullEndpoint(`${UsersApiPath.ROOT}${id}`, {}),
            {
                method: 'PUT',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return await response.json<UserWithProfileRelation>();
    }
}

export { UserApi };
