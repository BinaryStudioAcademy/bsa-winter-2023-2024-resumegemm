import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type SubscriptionResponseDto } from '../types/types';
import { getById } from './actions.js';

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
        builder.addCase(getById.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getById.fulfilled, (state, action) => {
            state.subscription = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(getById.rejected, (state) => {
            state.subscription = null;
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
