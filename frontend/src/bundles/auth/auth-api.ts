import {
    type UserForgotPasswordRequestDto,
    type UserForgotPasswordResponse,
    type UserResetPasswordRequestDto,
    type UserResetPasswordResponse,
    type UserVerifyResetPasswordTokenRequestDto,
    type UserVerifyResetPasswordTokenResponse,
} from 'shared/build/index.js';

import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import {
    type UserConfirmEmailRequestDto,
    type UserConfirmEmailResponse,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
    type UserWithProfileRelation,
} from '~/bundles/users/users.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import { type AuthTokenResponse } from '../users/types/types.js';
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

    public async confirmEmail(
        payload: UserConfirmEmailRequestDto,
    ): Promise<UserConfirmEmailResponse> {
        const response = await this.load(
            this.getFullEndpoint(AuthApiPath.CONFIRM_EMAIL, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: false,
            },
        );
        return await response.json<UserConfirmEmailResponse>();
    }

    public async getUser(): Promise<UserWithProfileRelation> {
        const response = await this.load(
            this.getFullEndpoint(AuthApiPath.USER, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<UserWithProfileRelation>();
    }

    public async requestNewAccessToken(): Promise<AuthTokenResponse> {
        const response = await this.load(
            this.getFullEndpoint(AuthApiPath.TOKEN, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<AuthTokenResponse>();
    }

    public async forgotPassword(
        payload: UserForgotPasswordRequestDto,
    ): Promise<UserForgotPasswordResponse> {
        const response = await this.load(
            this.getFullEndpoint(AuthApiPath.FORGOT_PASSWORD, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                hasAuth: false,
                payload: JSON.stringify(payload),
            },
        );

        return await response.json<UserForgotPasswordResponse>();
    }

    public async verifyResetPasswordToken(
        payload: UserVerifyResetPasswordTokenRequestDto,
    ): Promise<UserVerifyResetPasswordTokenResponse> {
        const response = await this.load(
            this.getFullEndpoint(AuthApiPath.VERIFY_RESET_TOKEN, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                hasAuth: false,
                payload: JSON.stringify(payload),
            },
        );

        return await response.json<UserVerifyResetPasswordTokenResponse>();
    }

    public async resetPassword(
        payload: UserResetPasswordRequestDto,
    ): Promise<UserResetPasswordResponse> {
        const response = await this.load(
            this.getFullEndpoint(AuthApiPath.RESET_PASSWORD, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                hasAuth: false,
                payload: JSON.stringify(payload),
            },
        );

        return await response.json<UserResetPasswordResponse>();
    }
}

export { AuthApi };
