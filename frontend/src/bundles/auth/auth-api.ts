import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import {
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
    type UserWithRelations,
} from '~/bundles/users/users.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import { AuthApiPath } from './enums/enums.js';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class AuthApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.AUTH, baseUrl, http, storage });
    }

    public async signUp(
        payload: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(AuthApiPath.SIGN_UP, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: false,
            },
        );

        return await response.json<UserSignUpResponseDto>();
    }

    public async signIn(
        payload: UserSignInRequestDto,
    ): Promise<UserSignInResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(AuthApiPath.SIGN_IN, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: false,
            },
        );

        return await response.json<UserSignInResponseDto>();
    }

    public async getUser(): Promise<UserWithRelations> {
        const response = await this.load(
            this.getFullEndpoint(AuthApiPath.USER, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<UserWithRelations>();
    }
}

export { AuthApi };
