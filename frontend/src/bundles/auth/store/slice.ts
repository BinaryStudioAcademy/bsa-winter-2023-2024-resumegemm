import { createSlice } from '@reduxjs/toolkit';
import { type UserProfileResponce } from 'shared/build/bundles/users/types/user-auth-response.type.js';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { signUp } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    user: UserProfileResponce | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    user: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(signUp.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(signUp.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(signUp.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
