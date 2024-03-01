import { type PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type UserWithRelations } from 'shared/build/index.js';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import {
    subscribe,
    unsubscribe,
} from '~/bundles/email-subscription/store/actions.js';
import { type EmailSubscription } from '~/bundles/email-subscription/types/types.js';

import { getUser, signIn, signUp } from './actions.js';

type State = {
    user: UserWithRelations | null;
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
        builder.addCase(
            subscribe.fulfilled,
            (state, action: PayloadAction<EmailSubscription>) => {
                if (state.user) {
                    state.user.emailSubscription = action.payload;
                }
            },
        );

        builder.addCase(unsubscribe.fulfilled, (state) => {
            if (state.user) {
                state.user.emailSubscription = null;
            }
        });

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
                state.user = action.payload.user;
            },
        );

        builder.addMatcher(
            isAnyOf(signUp.rejected, signIn.rejected, getUser.rejected),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
                state.user = null;
            },
        );
    },
});

export { actions, name, reducer };
