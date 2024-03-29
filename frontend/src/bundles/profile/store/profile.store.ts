import {
    deleteUserAvatar,
    disconnectSocialMedia,
    getUserProfileAndSocials,
    updateProfileAndEmail,
    updateUserAvatar,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    deleteUserAvatar,
    updateUserAvatar,
    getUserProfileAndSocials,
    disconnectSocialMedia,
    updateProfileAndEmail,
};

export { allActions as actions };
export { reducer } from './slice.js';
