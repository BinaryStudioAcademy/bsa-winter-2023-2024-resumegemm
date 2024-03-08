import {
    deleteUserAvatar,
    disconnectSocialMedia,
    getUserProfileAndSocials,
    updateUserAvatar,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    deleteUserAvatar,
    updateUserAvatar,
    getUserProfileAndSocials,
    disconnectSocialMedia,
};

export { allActions as actions };
export { reducer } from './slice.js';
