import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types';

import { type EmailSubscription } from '../types/types';
import { name as sliceName } from './slice.js';

const subscribe = createAsyncThunk<
    EmailSubscription,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/subscribe`, async (_, { extra }) => {
    const { emailSubscriptionsApi } = extra;

    return await emailSubscriptionsApi.subscribe();
});

const unsubscribe = createAsyncThunk<
    { message: string },
    { id: string },
    AsyncThunkConfig
>(`${sliceName}/unsubscribe`, async (payload, { extra }) => {
    const { emailSubscriptionsApi } = extra;

    return await emailSubscriptionsApi.unsubscribe(payload.id);
});

export { subscribe, unsubscribe };
