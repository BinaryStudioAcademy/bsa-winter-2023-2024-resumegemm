import { createAsyncThunk } from '@reduxjs/toolkit';
import { type AuthException } from 'shared/build';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserAuthResponse,
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
>(
    `${sliceName}/sign-up`,
    async (registerPayload, { extra, rejectWithValue }) => {
        const { authApi, storageApi } = extra;
        try {
            const { user, token: accessToken } = await authApi.signUp(
                registerPayload,
            );

            await storageApi.set(StorageKey.ACCESS_TOKEN, accessToken);

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

export { getUser, requestNewAccessToken, signIn, signUp };
