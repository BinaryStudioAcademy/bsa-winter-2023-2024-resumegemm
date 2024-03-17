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
    undefined,
    AsyncThunkConfig
>(`${sliceName}/delete`, async (_, { extra }) => {
    const { userApi, storageApi } = extra;

    const user = await userApi.deleteProfile();

    if (user) {
        await storageApi.drop(StorageKey.ACCESS_TOKEN);
    }

    return userApi.getAll();
});

const incrementPDFDownloads = createAsyncThunk<null, string, AsyncThunkConfig>(
    `${sliceName}/incrementPDFDownloads`,
    async (userId, { extra }) => {
        const { userApi } = extra;

        await userApi.incrementPDFDownloads(userId);
        return null;
    },
);

export { deleteProfile, incrementPDFDownloads, loadAll };
