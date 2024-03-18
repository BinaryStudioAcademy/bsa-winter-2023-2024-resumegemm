import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type SubscriptionResponseDto } from '../types/types';
import { cancelSubscription, getById, keepSubscription } from './actions.js';

type State = {
    subscription: SubscriptionResponseDto | null;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    subscription: null,
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'subscription',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getById.rejected, (state) => {
            state.subscription = null;
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addMatcher(
            isAnyOf(cancelSubscription.rejected, keepSubscription.rejected),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
        builder.addMatcher(
            isAnyOf(
                getById.fulfilled,
                cancelSubscription.fulfilled,
                keepSubscription.fulfilled,
            ),
            (state, action) => {
                state.subscription = action.payload;
                state.dataStatus = DataStatus.FULFILLED;
            },
        );
        builder.addMatcher(
            isAnyOf(
                getById.pending,
                cancelSubscription.pending,
                keepSubscription.pending,
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
    },
});

export { actions, name, reducer };
