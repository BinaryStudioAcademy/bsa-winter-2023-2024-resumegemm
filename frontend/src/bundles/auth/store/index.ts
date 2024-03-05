import {
    forgotPassword,
    resetPassword,
    signUp,
    verifyResetPasswordToken,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    signUp,
    forgotPassword,
    verifyResetPasswordToken,
    resetPassword,
};

export { allActions as actions };
export { reducer } from './slice.js';
