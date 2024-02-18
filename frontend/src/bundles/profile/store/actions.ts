import { createAsyncThunk } from '@reduxjs/toolkit';
import { type UserProfileResponce } from 'shared/build/bundles/users/types/user-auth-response.type.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

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