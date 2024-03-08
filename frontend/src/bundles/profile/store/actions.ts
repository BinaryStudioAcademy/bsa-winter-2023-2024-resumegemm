import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    type Profile,
    type SocialMediaProfiles,
    type UpdateUserProfileAndEmailRequestDto,
} from 'shared/build';

import { actions as authActions } from '~/bundles/auth/store/slice.js';
import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    getCurrentlyConnectedSocialMedias,
    updatedSocialMediaProfiles,
} from '../helpers/helpers.js';
import { name as sliceName } from './slice.js';

const updateUserAvatar = createAsyncThunk<Profile, FormData, AsyncThunkConfig>(
    `${sliceName}/update-user-avatar`,
    async (payload, { extra }) => {
        const { profileApi } = extra;

        return await profileApi.updateUserAvatar(payload);
    },
);

const getUserProfileAndSocials = createAsyncThunk<
    SocialMediaProfiles[],
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-social-media-profiles`, (_, { getState }) => {
    const {
        auth,
        profile: { socialMediaProfiles },
    } = getState();
    return getCurrentlyConnectedSocialMedias({
        socialMediaProfiles,
        oauthConnections: auth.user?.oauth_connections ?? [],
    });
});

const disconnectSocialMedia = createAsyncThunk<
    SocialMediaProfiles[],
    string,
    AsyncThunkConfig
>(`${sliceName}/disconnect-social-profile`, async (id, { extra, getState }) => {
    const {
        profile: { socialMediaProfiles },
    } = getState();
    const { openAuthApi } = extra;
    const hasDisconnected = await openAuthApi.disconnectSocialMedia(id);
    if (hasDisconnected) {
        return updatedSocialMediaProfiles(socialMediaProfiles, id);
    }
    return socialMediaProfiles;
});

const updateProfileAndEmail = createAsyncThunk<
    Profile,
    { id: string; payload: UpdateUserProfileAndEmailRequestDto },
    AsyncThunkConfig
>(
    `${sliceName}/update-profile-and-email`,
    async ({ id, payload }, { extra, dispatch }) => {
        const { userApi } = extra;
        const updatedUserWithProfile = await userApi.updateProfileAndEmail(
            id,
            payload,
        );
        dispatch(authActions.setUser(updatedUserWithProfile));
        return updatedUserWithProfile.userProfile;
    },
);

export {
    disconnectSocialMedia,
    getUserProfileAndSocials,
    updateProfileAndEmail,
    updateUserAvatar,
};
