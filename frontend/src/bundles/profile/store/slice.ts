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
        builder.addMatcher(
            isAnyOf(
                updateUserAvatar.fulfilled,
                updateProfileAndEmail.fulfilled,
            ),
            (state, action) => {
                state.profile = action.payload;
                state.dataStatus = DataStatus.FULFILLED;
            },
        );
        builder.addMatcher(
            isAnyOf(
                disconnectSocialMedia.pending,
                updateProfileAndEmail.pending,
                getUserProfileAndSocials.pending,
                updateUserAvatar.pending,
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
                updateUserAvatar.rejected,
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
