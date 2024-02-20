import { createSlice } from '@reduxjs/toolkit';

import { getPublishableKey } from './actions.js';

type State = {
    publishableKey: string | null;
};

const initialState: State = {
    publishableKey: null,
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
    },
});

export { actions, name, reducer };
