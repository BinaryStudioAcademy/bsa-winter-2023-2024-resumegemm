import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
    type SocialMediaProfiles,
    type UserWithProfileRelation,
} from 'shared/build';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { socialMediaProfiles } from '../helpers/helpers.js';
import { disconnectSocialMedia, getUserProfileAndSocials } from './actions';

type State = {
    profile: UserWithProfileRelation['userProfile'] | null;
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
        builder.addMatcher(isAnyOf(disconnectSocialMedia.pending), (state) => {
            state.dataStatus = DataStatus.PENDING;
        });

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
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
