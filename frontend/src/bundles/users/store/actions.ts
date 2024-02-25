import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserGetAllResponseDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/users.js';

import { name as sliceName } from './slice.js';

const loadAll = createAsyncThunk<
    UserGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, (_, { extra }) => {
    const { userApi } = extra;

    return userApi.getAll();
});

const loadUser = createAsyncThunk<
    UserSignUpResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/authenticated-user`, async (_registerPayload, { extra }) => {
    const { userApi } = extra;

    return await userApi.loadUser();
});

export { loadAll, loadUser };
