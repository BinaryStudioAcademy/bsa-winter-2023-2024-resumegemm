import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type ValueOf } from 'shared/build';

import { DataStatus } from '~/bundles/common/enums/data-status.enum';

import { type EmailSubscription } from '../types/types';
import { subscribe, unsubscribe } from './actions';

type State = {
    emailSubscription: EmailSubscription | null;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    emailSubscription: null,
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    name: 'emailSubscription',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(subscribe.fulfilled, (state, action) => {
                state.emailSubscription = action.payload;
                state.dataStatus = DataStatus.FULFILLED;
            })
            .addCase(unsubscribe.fulfilled, (state) => {
                state.emailSubscription = null;
                state.dataStatus = DataStatus.FULFILLED;
            })
            .addMatcher(
                isAnyOf(subscribe.pending, unsubscribe.pending),
                (state) => {
                    state.dataStatus = DataStatus.PENDING;
                },
            )
            .addMatcher(
                isAnyOf(subscribe.rejected, unsubscribe.rejected),
                (state) => {
                    state.dataStatus = DataStatus.REJECTED;
                },
            );
    },
});

export { actions, name, reducer };
