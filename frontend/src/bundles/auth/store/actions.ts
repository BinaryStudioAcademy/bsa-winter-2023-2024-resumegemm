import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { actions as userActions } from '~/bundles/users/store/index.js';
import {
    type UserAuthResponse,
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/users/users.js';
import { StorageKey } from '~/framework/storage/storage.js';

import { name as sliceName } from './slice.js';

const signUp = createAsyncThunk<
    UserAuthResponse,
    UserSignUpRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra, dispatch }) => {
    const { authApi, storageApi } = extra;

    const { token } = await authApi.signUp(registerPayload);

    void storageApi.set(StorageKey.ACCESS_TOKEN, token);

    const response = await authApi.signUp(registerPayload);

    if (response.user) {
        await dispatch(userActions.loadUser());
    }
    return response?.user;
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

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
const getUser = createAsyncThunk<UserAuthResponse, void, AsyncThunkConfig>(
    `${sliceName}/get-user`,
    async (_, { extra }) => {
        const { authApi } = extra;

        return await authApi.getUser();
    },
);

export { getUser, signIn, signUp };
