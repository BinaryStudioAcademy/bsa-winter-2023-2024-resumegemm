import { createAsyncThunk } from '@reduxjs/toolkit';
import { type AuthTokenResponse } from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserAuthResponse,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/users.js';

import { name as sliceName } from './slice.js';

const signUp = createAsyncThunk<
    UserSignUpResponseDto,
    UserSignUpRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, (registerPayload, { extra }) => {
    const { authApi } = extra;

    return authApi.signUp(registerPayload);
});

const signIn = createAsyncThunk<
    UserSignInResponseDto,
    UserSignInRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-in`, (signInPayload, { extra }) => {
    const { authApi } = extra;

    return authApi.signIn(signInPayload);
});

const getUser = createAsyncThunk<UserAuthResponse, void, AsyncThunkConfig>(
    `${sliceName}/get-user`,
    async (_, { extra }) => {
        const { authApi } = extra;

        return authApi.getUser();
    },
);

const getToken = createAsyncThunk<AuthTokenResponse, void, AsyncThunkConfig>(
    `${sliceName}/get-token`,
    async (_, { extra }) => {
        const { authApi } = extra;

        return authApi.getToken();
    },
);

export { getToken,getUser, signIn, signUp };
