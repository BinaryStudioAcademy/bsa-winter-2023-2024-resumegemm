/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { type SocialMediaProfiles } from 'shared/build';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    getCurrentlyConnectedSocialMedias,
    updatedSocialMediaProfiles,
} from '../helpers/helpers.js';
import { type UserProfileResponce } from '../types/user-profile-responce';
import { name as sliceName } from './slice.js';

const updateUserAvatar = createAsyncThunk<
    UserProfileResponce,
    FormData,
    AsyncThunkConfig
>(`${sliceName}/update-user-avatar`, async (payload, { extra }) => {
    const { profileApi } = extra;

    return await profileApi.updateUserAvatar(payload);
});

const getUserProfileAndSocials = createAsyncThunk<
    SocialMediaProfiles[],
    void,
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

export { disconnectSocialMedia, getUserProfileAndSocials, updateUserAvatar };
