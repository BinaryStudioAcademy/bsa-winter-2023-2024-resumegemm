import { type PayloadAction } from '@reduxjs/toolkit';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type UserWithProfileRelation } from 'shared/build/index.js';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { confirmEmail, signIn, signUp } from './actions.js';

type State = {
    user: UserWithProfileRelation | null;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    user: null,
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        setUser: (
            state,
            action: PayloadAction<UserWithProfileRelation | null>,
        ) => {
            state.user = action.payload;
            state.dataStatus = DataStatus.IDLE;
        },
    },
    extraReducers(builder) {
        builder.addMatcher(
            isAnyOf(signIn.fulfilled, confirmEmail.fulfilled),
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.user = action.payload;
            },
        );
        builder.addMatcher(isAnyOf(signUp.fulfilled), (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addMatcher(
            isAnyOf(signUp.rejected, signIn.rejected, confirmEmail.rejected),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
        builder.addMatcher(
            isAnyOf(signUp.pending, signIn.pending, confirmEmail.pending),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
    },
});

export { actions, name, reducer };
