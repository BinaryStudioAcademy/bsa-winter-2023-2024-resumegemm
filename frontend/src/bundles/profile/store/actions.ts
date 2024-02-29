import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type UserProfileResponce } from '../types/user-profile-responce';
import { name as sliceName } from './slice.js';

const updateUserAvatar = createAsyncThunk<
    UserProfileResponce,
    FormData,
    AsyncThunkConfig
>(`${sliceName}/update-user-avatar`, async (payload, { extra }) => {
    const { profileApi } = extra;

    return await profileApi.updateUserAvatar(payload);
});

export { updateUserAvatar };
