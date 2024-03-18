import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type SubscriptionResponseDto } from '../types/types';
import { name as sliceName } from './slice.js';

const getById = createAsyncThunk<
    SubscriptionResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-subscription`, async (_, { extra }) => {
    const { subscriptionApi } = extra;

    return await subscriptionApi.getById();
});

const cancelSubscription = createAsyncThunk<
    SubscriptionResponseDto,
    string,
    AsyncThunkConfig
>(`${sliceName}/cancel-subscription`, async (subscriptionId, { extra }) => {
    const { subscriptionApi } = extra;

    return await subscriptionApi.cancelSubscription(subscriptionId);
});

const keepSubscription = createAsyncThunk<
    SubscriptionResponseDto,
    string,
    AsyncThunkConfig
>(`${sliceName}/keep-subscription`, async (subscriptionId, { extra }) => {
    const { subscriptionApi } = extra;

    return await subscriptionApi.keepSubscription(subscriptionId);
});

export { cancelSubscription, getById, keepSubscription };
