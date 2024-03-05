import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type Profile, type SocialMediaProfiles } from 'shared/build';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { socialMediaProfiles } from '../helpers/helpers.js';
import {
    disconnectSocialMedia,
    getUserProfileAndSocials,
    updateProfileAndEmail,
    updateUserAvatar,
} from './actions';

type State = {
    profile: Profile | null;
    dataStatus: ValueOf<typeof DataStatus>;
    socialMediaProfiles: SocialMediaProfiles[];
};

const initialState: State = {
    profile: null,
    dataStatus: DataStatus.IDLE,
    socialMediaProfiles,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'profile',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(updateUserAvatar.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(updateProfileAndEmail.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addMatcher(
            isAnyOf(
                disconnectSocialMedia.pending,
                updateProfileAndEmail.pending,
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );

        builder.addMatcher(
            isAnyOf(
                disconnectSocialMedia.fulfilled,
                getUserProfileAndSocials.fulfilled,
            ),
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.socialMediaProfiles = action.payload;
            },
        );

        builder.addMatcher(
            isAnyOf(
                disconnectSocialMedia.rejected,
                getUserProfileAndSocials.rejected,
                updateProfileAndEmail.rejected,
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
