import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { 
    type CreatePaymentIntentRequestDto, 
    type CreatePaymentIntentResponseDto, 
    type CreateSubscriptionRequestDto, 
    type CreateSubscriptionResponseDto,
    type GetPricesRequestDto, 
    type GetPricesResponseDto, 
    type GetPublishableKeyRequestDto, 
    type GetPublishableKeyResponseDto } from '../types/types';
import { name as sliceName } from './slice.js';

const getPublishableKey = createAsyncThunk<
    GetPublishableKeyResponseDto,
    GetPublishableKeyRequestDto,
    AsyncThunkConfig
>(`${sliceName}/get-publishable-key`, (registerPayload, { extra }) => {
    const { paymentApi } = extra;

    return paymentApi.getPublishableKey();
});

const createPaymentIntent = createAsyncThunk<
    CreatePaymentIntentResponseDto,
    CreatePaymentIntentRequestDto,
    AsyncThunkConfig
>(`${sliceName}/create-payment-intent`, (registerPayload, { extra }) => {
    const { paymentApi } = extra;

    return paymentApi.createPaymentIntent(registerPayload);
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

export { 
    createPaymentIntent, 
    createSubscription, 
    getPrices, 
    getPublishableKey 
};
