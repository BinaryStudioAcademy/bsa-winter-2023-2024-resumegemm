import { type PayloadAction } from '@reduxjs/toolkit';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type UserWithProfileRelation } from 'shared/build/index.js';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import {
    confirmEmail,
    getUser,
    requestNewAccessToken,
    signIn,
    signUp,
} from './actions.js';

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
        },
    },
    extraReducers(builder) {
        builder.addCase(requestNewAccessToken.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addMatcher(
            isAnyOf(
                confirmEmail.pending,
                signUp.pending,
                signIn.pending,
                getUser.pending,
                requestNewAccessToken.pending,
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            isAnyOf(
                confirmEmail.fulfilled,
                signIn.fulfilled,
                getUser.fulfilled,
            ),
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.user = action.payload;
            },
        );
        builder.addMatcher(isAnyOf(signUp.fulfilled), (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addMatcher(
            isAnyOf(
                confirmEmail.rejected,
                signUp.rejected,
                signIn.rejected,
                getUser.rejected,
                requestNewAccessToken.rejected,
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
                state.user = null;
            },
        );
    },
});

export { actions, name, reducer };
