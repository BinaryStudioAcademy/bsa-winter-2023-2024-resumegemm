import { createSlice } from '@reduxjs/toolkit';
import { type UserProfileResponce } from 'shared/build/bundles/profile/types/user-profile-response.type';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { updateUserAvatar } from './actions'; 

type State = {
    profile: UserProfileResponce | null;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    profile: null,
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'profile',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(
            updateUserAvatar.fulfilled,
            (state, action) => {
                state.profile = action.payload;
                state.dataStatus = DataStatus.FULFILLED;
            },
          );
    },
});

export { actions, name, reducer };
