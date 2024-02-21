import { createSlice } from '@reduxjs/toolkit';

import { createPaymentIntent, createSubscription, getPublishableKey } from './actions.js';

type State = {
    publishableKey: string | null;
    clientSecret: string | null;
    subscriptionId: string | null;
};

const initialState: State = {
    publishableKey: null,
    clientSecret: null,
    subscriptionId: null,
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
    },
});

export { actions, name, reducer };
