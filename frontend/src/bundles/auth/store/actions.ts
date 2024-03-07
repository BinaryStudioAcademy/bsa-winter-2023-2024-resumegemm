import { createAsyncThunk } from '@reduxjs/toolkit';
import { type UserWithProfileRelation } from 'shared/build/bundles/users/types/user-with-profile-nested-relation.type.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserAuthResponse,
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/users/users.js';
import { StorageKey } from '~/framework/storage/storage.js';

import { actions as userActions } from '../../users/store/user.store';
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

    await dispatch(userActions.loadUser());
    return response.user;
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

const getUser = createAsyncThunk<UserAuthResponse, undefined, AsyncThunkConfig>(
    `${sliceName}/get-user`,
    async (_, { extra }) => {
        const { authApi } = extra;

        return await authApi.getUser();
    },
);

export { getUser, signIn, signUp };
