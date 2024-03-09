import { type PayloadAction } from '@reduxjs/toolkit';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type UserWithProfileRelation } from 'shared/build/index.js';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { getUser, signIn, signUp, updateAccessToken } from './actions.js';

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
        builder.addCase(updateAccessToken.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addMatcher(
            isAnyOf(
                signUp.pending,
                signIn.pending,
                getUser.pending,
                updateAccessToken.pending,
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );

        builder.addMatcher(
            isAnyOf(signUp.fulfilled, signIn.fulfilled, getUser.fulfilled),
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.user = action.payload as UserWithProfileRelation;
            },
        );

        builder.addMatcher(
            isAnyOf(
                signUp.rejected,
                signIn.rejected,
                getUser.rejected,
                updateAccessToken.rejected,
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
                state.user = null;
            },
        );
    },
});

export { actions, name, reducer };
