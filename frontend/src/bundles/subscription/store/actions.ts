import { createAsyncThunk } from '@reduxjs/toolkit';

import { actions as authActions } from '~/bundles/auth/store/slice';
import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type SubscriptionResponseDto } from '../types/types';
import { name as sliceName } from './slice.js';

const getById = createAsyncThunk<
    SubscriptionResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-subscription`, async (_, { extra, dispatch }) => {
    const { subscriptionApi } = extra;
    const subscription = await subscriptionApi.getById();

    dispatch(
        authActions.setSubscription(
            subscription ? !subscription.isCancelled : false,
        ),
    );

    return subscription;
});

const cancelSubscription = createAsyncThunk<
    SubscriptionResponseDto,
    string,
    AsyncThunkConfig
>(
    `${sliceName}/cancel-subscription`,
    async (subscriptionId, { extra, dispatch }) => {
        const { subscriptionApi } = extra;
        dispatch(authActions.setSubscription(false));
        return await subscriptionApi.cancelSubscription(subscriptionId);
    },
);

const keepSubscription = createAsyncThunk<
    SubscriptionResponseDto,
    string,
    AsyncThunkConfig
>(
    `${sliceName}/keep-subscription`,
    async (subscriptionId, { extra, dispatch }) => {
        const { subscriptionApi } = extra;
        dispatch(authActions.setSubscription(true));
        return await subscriptionApi.keepSubscription(subscriptionId);
    },
);

export { cancelSubscription, getById, keepSubscription };
