import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import {
    type UserGetAllItemResponseDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/users.js';

import { loadAll, loadUser } from './actions.js';

type State = {
    users: UserGetAllItemResponseDto[];
    user: UserSignUpResponseDto | undefined;
    dataStatus: ValueOf<typeof DataStatus>;
    isLoaded: boolean;
};

const initialState: State = {
    users: [],
    user: undefined,
    dataStatus: DataStatus.IDLE,
    isLoaded: false,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'users',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadAll.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadAll.fulfilled, (state, action) => {
            state.users = action.payload.items;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadAll.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
            state.isLoaded = true;
        });
    },
});

export { actions, name, reducer };
