import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type UserAuthResponse } from 'shared/build/index.js';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { signIn, signUp } from './actions.js';

type State = {
    user: UserAuthResponse | null;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    user: null,
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            isAnyOf(signUp.fulfilled, signIn.fulfilled),
            (state) => {
                state.dataStatus = DataStatus.FULFILLED;
            },
        );

        builder.addMatcher(
            isAnyOf(signUp.rejected, signIn.rejected),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );

        builder.addMatcher(isAnyOf(signUp.pending, signIn.pending), (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
    },
});

export { actions, name, reducer };
