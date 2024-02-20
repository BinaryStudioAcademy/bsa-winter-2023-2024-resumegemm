import { createSlice } from '@reduxjs/toolkit';

import { createPaymentIntent, getPublishableKey } from './actions.js';

type State = {
    publishableKey: string | null;
    clientSecret: string | null;
};

const initialState: State = {
    publishableKey: null,
    clientSecret: null,
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
    },
});

export { actions, name, reducer };
