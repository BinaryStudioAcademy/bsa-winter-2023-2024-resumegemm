import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type UserWithProfileRelation } from 'shared/build/index.js';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { actions as profileActions } from '~/bundles/profile/store/profile.store.js';

import { getUser, signIn, signUp } from './actions.js';

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
        builder.addCase(profileActions.updateUserAvatar.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });

        builder.addMatcher(
            isAnyOf(
                signUp.pending,
                signIn.pending,
                getUser.pending,
                profileActions.updateUserAvatar.pending,
                profileActions.deleteUserAvatar.pending,
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
            isAnyOf(signUp.rejected, signIn.rejected, getUser.rejected),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
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
