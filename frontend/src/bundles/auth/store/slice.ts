import { type PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
    type AuthException as AuthExceptionError,
    type UserWithRelations,
} from 'shared/build/index.js';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import {
    subscribe,
    unsubscribe,
} from '~/bundles/email-subscription/store/actions.js';
import { type EmailSubscription } from '~/bundles/email-subscription/types/types.js';

import {
    forgotPassword,
    getUser,
    requestNewAccessToken,
    resetPassword,
    signIn,
    signUp,
    verifyResetPasswordToken,
} from './actions.js';

type State = {
    user: UserWithRelations | null;
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
        setUser: (state, action: PayloadAction<UserWithRelations | null>) => {
            state.user = action.payload;
        },
    },
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

        builder.addCase(requestNewAccessToken.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addMatcher(
            isAnyOf(
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
                signUp.fulfilled,
                signIn.fulfilled,
                getUser.fulfilled,
                resetPassword.fulfilled,
            ),
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.user = action.payload.user;
            },
        );

        builder.addMatcher(
            isAnyOf(
                verifyResetPasswordToken.fulfilled,
                forgotPassword.fulfilled,
            ),
            (state) => {
                state.dataStatus = DataStatus.FULFILLED;
            },
        );

        builder.addMatcher(
            isAnyOf(
                signUp.rejected,
                signIn.rejected,
                getUser.rejected,
                requestNewAccessToken.rejected,
                verifyResetPasswordToken.rejected,
                forgotPassword.rejected,
                resetPassword.rejected,
            ),
            (state, action) => {
                state.dataStatus = DataStatus.REJECTED;
                state.error = action.payload as AuthExceptionError;
                state.user = null;
            },
        );
    },
});

export { actions, name, reducer };
