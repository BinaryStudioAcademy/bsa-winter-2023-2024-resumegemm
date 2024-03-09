import { createAsyncThunk } from '@reduxjs/toolkit';
import { type UserWithProfileRelation } from 'shared/build/bundles/users/types/user-with-profile-nested-relation.type.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserAuthResponse,
    type UserConfirmEmailRequestDto,
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/users/users.js';
import { StorageKey } from '~/framework/storage/storage.js';

import { name as sliceName } from './slice.js';

const signUp = createAsyncThunk<
    UserWithProfileRelation | null,
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

const getUser = createAsyncThunk<UserAuthResponse, undefined, AsyncThunkConfig>(
    `${sliceName}/get-user`,
    async (_, { extra }) => {
        const { authApi } = extra;

        return await authApi.getUser();
    },
);

export { confirmEmail, getUser, signIn, signUp };
