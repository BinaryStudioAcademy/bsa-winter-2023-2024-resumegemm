import { createAsyncThunk } from '@reduxjs/toolkit';

// import { UserProfileResponce } from 'shared/build/bundles/users/types/user-auth-response.type.js';
import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { type UserGetAllResponseDto } from '~/bundles/users/users.js';

import { name as sliceName } from './slice.js';

const loadAll = createAsyncThunk<
    UserGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, (_, { extra }) => {
    const { userApi } = extra;

    return userApi.getAll();
});

export { loadAll };
