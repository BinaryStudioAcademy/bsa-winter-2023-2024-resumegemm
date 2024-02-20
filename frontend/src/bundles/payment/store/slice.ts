import { createSlice } from '@reduxjs/toolkit';

import { createPaymentIntent, getPublishableKey } from './actions.js';

type State = {
    publishableKey: string | null;
    secretKey: string | null;
};

const initialState: State = {
    publishableKey: null,
    secretKey: null,
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
            state.secretKey = action.payload.clientSecret;
        });
        builder.addCase(createPaymentIntent.rejected, (state) => {
            state.publishableKey = null;
        });
    },
});

export { actions, name, reducer };
