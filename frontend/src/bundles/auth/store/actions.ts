import { createAsyncThunk } from '@reduxjs/toolkit';
import { type AuthException } from 'shared/build';
import { type UserWithProfileRelation } from 'shared/build/bundles/users/types/user-with-profile-nested-relation.type.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
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

const getUser = createAsyncThunk<UserAuthResponse, undefined, AsyncThunkConfig>(
    `${sliceName}/get-user`,
    async (_, { extra }) => {
        const { authApi } = extra;

        return await authApi.getUser();
    },
);

export { getUser, signIn, signUp };
