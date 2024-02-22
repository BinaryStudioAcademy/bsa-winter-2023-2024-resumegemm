import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { type UserGetAllResponseDto } from '~/bundles/users/users.js';
import { StorageKey } from '~/framework/storage/storage.js';

import { name as sliceName } from './slice.js';

const loadAll = createAsyncThunk<
    UserGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, (_, { extra }) => {
    const { userApi } = extra;

    return userApi.getAll();
});
const deleteProfile = createAsyncThunk<
    UserGetAllResponseDto,
    { id: string },
    AsyncThunkConfig
>(`${sliceName}/delete`, async (payload, { extra }) => {
    const { id } = payload;
    const { userApi, storageApi } = extra;

    const user = await userApi.deleteProfile(id);

    if (user) {
        await storageApi.drop(StorageKey.ACCESS_TOKEN);
    }

    return userApi.getAll();
});

export { deleteProfile, loadAll };
