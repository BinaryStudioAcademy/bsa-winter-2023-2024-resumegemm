import { type PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
    type AuthException as AuthExceptionError,
    type UserWithProfileRelation,
} from 'shared/build/index.js';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { actions as profileActions } from '~/bundles/profile/store/profile.store.js';

import {
    confirmEmail,
    forgotPassword,
    getUser,
    requestNewAccessToken,
    resetPassword,
    signIn,
    signUp,
    verifyResetPasswordToken,
} from './actions.js';

type State = {
    user: UserWithProfileRelation | null;
    dataStatus: ValueOf<typeof DataStatus>;
    error: null | AuthExceptionError;
    hasSubscription: boolean;
};

const initialState: State = {
    user: null,
    dataStatus: DataStatus.IDLE,
    error: null,
    hasSubscription: false,
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
        setError: (state, action: PayloadAction<AuthExceptionError | null>) => {
            state.error = action.payload;
        },
        setSubscription: (state, action) => {
            state.hasSubscription = action.payload ?? false;
        },
    },
    extraReducers(builder) {
        builder.addCase(requestNewAccessToken.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(profileActions.updateUserAvatar.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });

        builder.addMatcher(
            isAnyOf(
                confirmEmail.pending,
                signUp.pending,
                signIn.pending,
                getUser.pending,
                requestNewAccessToken.pending,
                profileActions.updateUserAvatar.pending,
                profileActions.deleteUserAvatar.pending,
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );

        builder.addMatcher(
            isAnyOf(
                signIn.fulfilled,
                getUser.fulfilled,
                resetPassword.fulfilled,
            ),
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.user =
                    action.payload as unknown as UserWithProfileRelation;
            },
        );

        builder.addMatcher(
            isAnyOf(
                signUp.fulfilled,
                verifyResetPasswordToken.fulfilled,
                forgotPassword.fulfilled,
            ),
            (state) => {
                state.dataStatus = DataStatus.FULFILLED;
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

        builder.addMatcher(
            isAnyOf(
                confirmEmail.rejected,
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

        builder.addMatcher(
            isAnyOf(
                profileActions.updateUserAvatar.fulfilled,
                profileActions.deleteUserAvatar.fulfilled,
            ),
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;

                if (state.user) {
                    state.user.userProfile.avatar = action.payload.avatar;
                }
            },
        );
    },
});

export { actions, name, reducer };
