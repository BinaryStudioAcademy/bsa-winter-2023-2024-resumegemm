import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';

import { type GetPriceResponseDto } from '../types/types.js';
import { createSubscription, getPrices, getPublishableKey } from './actions.js';

type State = {
    publishableKey: string | null;
    clientSecret: string | null;
    subscriptionId: string | null;
    prices: GetPriceResponseDto[];
    dataStatus: DataStatus;
};

const initialState: State = {
    publishableKey: null,
    clientSecret: null,
    subscriptionId: null,
    prices: [],
    dataStatus: DataStatus.IDLE,
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
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(getPrices.pending, (state, action) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getPrices.rejected, (state) => {
            state.prices = [];
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
