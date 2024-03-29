import {
    confirmEmail,
    forgotPassword,
    getUser,
    requestNewAccessToken,
    resetPassword,
    signIn,
    signUp,
    verifyResetPasswordToken,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    confirmEmail,
    signUp,
    signIn,
    getUser,
    forgotPassword,
    verifyResetPasswordToken,
    resetPassword,
    requestNewAccessToken,
};

export { allActions as actions };
export { reducer } from './slice.js';
