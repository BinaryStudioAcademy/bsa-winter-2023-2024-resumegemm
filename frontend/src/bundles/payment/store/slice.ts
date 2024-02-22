import { createSlice } from '@reduxjs/toolkit';

import { type GetPriceResponseDto } from '../types/types.js';
import { createPaymentIntent, createSubscription, getPrices, getPublishableKey } from './actions.js';

type State = {
    publishableKey: string | null;
    clientSecret: string | null;
    subscriptionId: string | null;
    prices: GetPriceResponseDto[];
};

const initialState: State = {
    publishableKey: null,
    clientSecret: null,
    subscriptionId: null,
    prices: []
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'payment',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getPublishableKey.fulfilled, (state, action) => {
            state.publishableKey = action.payload.publishableKey;
        });
        builder.addCase(getPublishableKey.rejected, (state) => {
            state.publishableKey = null;
        });

        builder.addCase(createPaymentIntent.fulfilled, (state, action) => {
            state.clientSecret = action.payload.clientSecret;  
        });
        builder.addCase(createPaymentIntent.rejected, (state) => {
            state.clientSecret = null;
        });

        builder.addCase(createSubscription.fulfilled, (state, action) => {
            state.clientSecret = action.payload.clientSecret;  
            state.subscriptionId = action.payload.subscriptionId;
        });
        builder.addCase(createSubscription.rejected, (state) => {
            state.clientSecret = null;
            state.subscriptionId = null;
        });

        builder.addCase(getPrices.fulfilled, (state, action) => {
            state.prices = action.payload.prices;  
        });
        builder.addCase(getPrices.rejected, (state) => {
            state.prices = [];
        });
    },
});

export { actions, name, reducer };
