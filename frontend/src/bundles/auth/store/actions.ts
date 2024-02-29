import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    type UserResetPasswordRequestDto,
    type UserResetPasswordResponse,
    type UserVerifyResetTokenRequestDto,
    type UserVerifyResetTokenResponse,
} from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserAuthResponse,
    type UserForgotPasswordRequestDto,
    type UserForgotPasswordResponse,
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/users/users.js';
import { StorageKey } from '~/framework/storage/storage.js';

import { name as sliceName } from './slice.js';

const signUp = createAsyncThunk<
    UserAuthResponse,
    UserSignUpRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra }) => {
    const { authApi } = extra;
    const { user } = await authApi.signUp(registerPayload);

    return user;
});

const signIn = createAsyncThunk<
    UserAuthResponse,
    UserSignInRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-in`, async (signInPayload, { extra }) => {
    const { authApi, storageApi } = extra;
    const { user, accessToken } = await authApi.signIn(signInPayload);

    await storageApi.set(StorageKey.ACCESS_TOKEN, accessToken);

    return user;
});

const forgotPassword = createAsyncThunk<
    UserForgotPasswordResponse,
    UserForgotPasswordRequestDto,
    AsyncThunkConfig
>(`${sliceName}/forgot-password`, async (forgotPasswordPayload, { extra }) => {
    const { authApi } = extra;

    return await authApi.forgotPassword(forgotPasswordPayload);
});

const verifyResetToken = createAsyncThunk<
    UserVerifyResetTokenResponse,
    UserVerifyResetTokenRequestDto,
    AsyncThunkConfig
>(
    `${sliceName}/verify-reset-token`,
    async (verifyResetTokenPayload, { extra }) => {
        const { authApi } = extra;

        return await authApi.verifyResetToken(verifyResetTokenPayload);
    },
);

const resetPassword = createAsyncThunk<
    UserResetPasswordResponse,
    UserResetPasswordRequestDto,
    AsyncThunkConfig
>(`${sliceName}/reset-password`, async (resetPasswordPayload, { extra }) => {
    const { authApi } = extra;

    return await authApi.resetPassword(resetPasswordPayload);
});

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
const getUser = createAsyncThunk<UserAuthResponse, void, AsyncThunkConfig>(
    `${sliceName}/get-user`,
    async (_, { extra }) => {
        const { authApi } = extra;

        return await authApi.getUser();
    },
);

export {
    forgotPassword,
    getUser,
    resetPassword,
    signIn,
    signUp,
    verifyResetToken,
};
