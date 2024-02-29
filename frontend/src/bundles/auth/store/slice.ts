import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type UserAuthResponse } from 'shared/build/index.js';

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
            isAnyOf(signUp.pending, signIn.pending, getUser.pending),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );

        builder.addMatcher(
            isAnyOf(signUp.fulfilled, signIn.fulfilled, getUser.fulfilled),
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.user = action.payload;
            },
        );

        builder.addMatcher(
            isAnyOf(
                verifyResetToken.fulfilled,
                forgotPassword.fulfilled,
                resetPassword.fulfilled,
            ),
            (_, action) => {
                showToast(
                    JSON.stringify(action.payload.message),
                    ToastType.SUCCESS,
                );
            },
        );

        builder.addMatcher(
            isAnyOf(
                verifyResetToken.rejected,
                forgotPassword.rejected,
                resetPassword.rejected,
            ),
            (state, action) => {
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
