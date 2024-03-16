import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type SubscriptionResponseDto } from '../types/types';
import { name as sliceName } from './slice.js';

const getById = createAsyncThunk<
    SubscriptionResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/subscription`, async (_, { extra }) => {
    const { subscriptionApi } = extra;

    return await subscriptionApi.getById();
});

export { getById };
