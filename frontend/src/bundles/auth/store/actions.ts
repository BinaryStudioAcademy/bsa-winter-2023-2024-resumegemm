import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    type AuthException,
    type UserResetPasswordRequestDto,
    type UserVerifyResetPasswordTokenRequestDto,
    type UserVerifyResetPasswordTokenResponse,
} from 'shared/build';

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

import { actions as authActions, name as sliceName } from './slice.js';

const signUp = createAsyncThunk<
    UserAuthResponse['user'],
    UserSignUpRequestDto,
    AsyncThunkConfig
>(
    `${sliceName}/sign-up`,
    async (registerPayload, { extra, rejectWithValue }) => {
        try {
            const { authApi } = extra;
            const { user } = await authApi.signUp(registerPayload);
            return user;
        } catch (error: unknown) {
            const { message, errorType } = error as AuthException;
            return rejectWithValue({ message, errorType });
        }
    },
);

const signIn = createAsyncThunk<
    UserWithProfileRelation,
    UserSignInRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-in`, async (signInPayload, { extra, rejectWithValue }) => {
    try {
        const { authApi, storageApi } = extra;
        const { user, accessToken } = await authApi.signIn(signInPayload);

        await storageApi.set(StorageKey.ACCESS_TOKEN, accessToken);

        return user;
    } catch (error: unknown) {
        const { message, errorType } = error as AuthException;
        return rejectWithValue({ message, errorType });
    }
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
>(`${sliceName}/get-user`, async (_, { extra, dispatch }) => {
    const { authApi, subscriptionApi } = extra;
    const hasSubscription = await subscriptionApi.getById();
    if (hasSubscription) {
        dispatch(authActions.setSubscription(!hasSubscription.isCancelled));
    }
    return authApi.getUser();
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
