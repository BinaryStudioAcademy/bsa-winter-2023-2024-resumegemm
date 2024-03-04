import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type UserWithProfileRelation } from 'shared/build/index.js';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum.js';
import { showToast } from '~/bundles/toast/helpers/show-toast.js';

import {
    forgotPassword,
    getUser,
    resetPassword,
    signIn,
    signUp,
    verifyResetToken,
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
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            isAnyOf(signUp.pending, signIn.pending, getUser.pending),
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
                state.user = action.payload as UserWithProfileRelation;
            },
        );

        builder.addMatcher(
            isAnyOf(
                verifyResetToken.fulfilled,
                forgotPassword.fulfilled,
                resetPassword.fulfilled,
            ),
            (state) => {
                state.dataStatus = DataStatus.FULFILLED;
            },
        );

        builder.addMatcher(
            isAnyOf(
                verifyResetToken.rejected,
                forgotPassword.rejected,
                resetPassword.rejected,
            ),
            (state, action) => {
                state.dataStatus = DataStatus.REJECTED;

                showToast(
                    JSON.stringify(action.error.message),
                    ToastType.ERROR,
                );
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
