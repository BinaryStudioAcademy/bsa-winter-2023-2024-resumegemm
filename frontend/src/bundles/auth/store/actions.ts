import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    type UserResetPasswordRequestDto,
    type UserVerifyResetPasswordTokenRequestDto,
    type UserVerifyResetPasswordTokenResponse,
} from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserAuthResponse,
    type UserConfirmEmailRequestDto,
    type UserForgotPasswordRequestDto,
    type UserForgotPasswordResponse,
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
    type UserWithProfileRelation,
} from '~/bundles/users/users.js';
import { StorageKey } from '~/framework/storage/storage.js';

import { name as sliceName } from './slice.js';

const signUp = createAsyncThunk<
    UserAuthResponse['user'],
    UserSignUpRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra }) => {
    const { authApi } = extra;
    const { user } = await authApi.signUp(registerPayload);

    return user;
});

const signIn = createAsyncThunk<
    UserWithProfileRelation,
    UserSignInRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-in`, async (signInPayload, { extra }) => {
    const { authApi, storageApi } = extra;
    const { user, accessToken } = await authApi.signIn(signInPayload);
    await storageApi.set(StorageKey.ACCESS_TOKEN, accessToken);

    return user;
});

const confirmEmail = createAsyncThunk<
    UserWithProfileRelation,
    UserConfirmEmailRequestDto,
    AsyncThunkConfig
>(`${sliceName}/confirm-email`, async (payload, { extra }) => {
    const { authApi, storageApi } = extra;
    const { user, accessToken } = await authApi.confirmEmail(payload);

    await storageApi.set(StorageKey.ACCESS_TOKEN, accessToken);

    return user;
});

const getUser = createAsyncThunk<
    UserWithProfileRelation,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-user`, async (_, { extra }) => {
    const { authApi } = extra;

    return await authApi.getUser();
});

const requestNewAccessToken = createAsyncThunk<
    void,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/update-access-token`, async (_, { extra }) => {
    const { authApi, storageApi } = extra;

    const { accessToken } = await authApi.requestNewAccessToken();
    await storageApi.set(StorageKey.ACCESS_TOKEN, accessToken);
});

const forgotPassword = createAsyncThunk<
    UserForgotPasswordResponse,
    UserForgotPasswordRequestDto,
    AsyncThunkConfig
>(`${sliceName}/forgot-password`, async (forgotPasswordPayload, { extra }) => {
    const { authApi } = extra;

    return await authApi.forgotPassword(forgotPasswordPayload);
});

const verifyResetPasswordToken = createAsyncThunk<
    UserVerifyResetPasswordTokenResponse,
    UserVerifyResetPasswordTokenRequestDto,
    AsyncThunkConfig
>(
    `${sliceName}/verify-reset-token`,
    async (verifyResetPasswordTokenPayload, { extra }) => {
        const { authApi } = extra;

        return await authApi.verifyResetPasswordToken(
            verifyResetPasswordTokenPayload,
        );
    },
);

const resetPassword = createAsyncThunk<
    UserWithProfileRelation,
    UserResetPasswordRequestDto,
    AsyncThunkConfig
>(`${sliceName}/reset-password`, async (resetPasswordPayload, { extra }) => {
    const { authApi, storageApi } = extra;

    const { accessToken, user } = await authApi.resetPassword(
        resetPasswordPayload,
    );

    await storageApi.set(StorageKey.ACCESS_TOKEN, accessToken);

    return user;
});

export {
    confirmEmail,
    forgotPassword,
    getUser,
    requestNewAccessToken,
    resetPassword,
    signIn,
    signUp,
    verifyResetPasswordToken,
};
