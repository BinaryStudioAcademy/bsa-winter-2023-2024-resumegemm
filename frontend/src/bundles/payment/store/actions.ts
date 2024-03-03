import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type CreateSubscriptionRequestDto,
    type CreateSubscriptionResponseDto,
    type GetPricesRequestDto,
    type GetPricesResponseDto,
    type GetPublishableKeyRequestDto,
    type GetPublishableKeyResponseDto,
} from '../types/types';
import { name as sliceName } from './slice.js';

const getPublishableKey = createAsyncThunk<
    GetPublishableKeyResponseDto,
    GetPublishableKeyRequestDto,
    AsyncThunkConfig
>(`${sliceName}/get-publishable-key`, (registerPayload, { extra }) => {
    const { paymentApi } = extra;

    return paymentApi.getPublishableKey();
});

const createSubscription = createAsyncThunk<
    CreateSubscriptionResponseDto,
    CreateSubscriptionRequestDto,
    AsyncThunkConfig
>(`${sliceName}/create-subscription`, (registerPayload, { extra }) => {
    const { paymentApi } = extra;

    return paymentApi.createSubscription(registerPayload);
});

const getPrices = createAsyncThunk<
    GetPricesResponseDto,
    GetPricesRequestDto,
    AsyncThunkConfig
>(`${sliceName}/get-prices`, (registerPayload, { extra }) => {
    const { paymentApi } = extra;

    return paymentApi.getPrices();
});

export { createSubscription, getPrices, getPublishableKey };
