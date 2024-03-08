import { type PayloadAction } from '@reduxjs/toolkit';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
    type AuthException as AuthExceptionError,
    type UserWithProfileRelation,
} from 'shared/build/index.js';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { getUser, signIn, signUp } from './actions.js';

type State = {
    user: UserWithProfileRelation | null;
    dataStatus: ValueOf<typeof DataStatus>;
    error: null | AuthExceptionError;
};

const initialState: State = {
    user: null,
    dataStatus: DataStatus.IDLE,
    error: null,
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
            isAnyOf(signUp.pending, signIn.pending, getUser.pending),
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
            isAnyOf(signUp.rejected, signIn.rejected, getUser.rejected),
            (state, action) => {
                state.dataStatus = DataStatus.REJECTED;
                state.error = action.payload as AuthExceptionError;
                state.user = null;
            },
        );
    },
});

export { actions, name, reducer };
