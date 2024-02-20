import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type CreatePaymentIntentRequestDto, type CreatePaymentIntentResponseDto, type GetPublishableKeyRequestDto, type GetPublishableKeyResponseDto } from '../types/types';
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

export { createPaymentIntent, getPublishableKey };
