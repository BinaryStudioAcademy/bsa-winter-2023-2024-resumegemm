import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type UserProfileResponce } from '../types/user-profile-responce';
import { name as sliceName } from './slice.js';

const updateUserAvatar = createAsyncThunk<
    Pick<UserProfileResponce, 'avatar'>,
    FormData,
    AsyncThunkConfig
>(`${sliceName}/update-user-avatar`, async (payload, { extra }) => {
    const { profileApi } = extra;

    return await profileApi.updateUserAvatar(payload);
});

const deleteUserAvatar = createAsyncThunk<
    Pick<UserProfileResponce, 'avatar'>,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/delete-user-avatar`, async (_, { extra }) => {
    const { profileApi } = extra;

    return await profileApi.deleteUserAvatar();
});

export { deleteUserAvatar, updateUserAvatar };
