import { type UserResetPassword } from 'shared/src/bundles/users/types/user-reset-password.type.js';

const DEFAULT_PASSWORD_PAYLOAD: UserResetPassword = {
    password: '',
    repeat_password: '',
} as const;

export { DEFAULT_PASSWORD_PAYLOAD };
