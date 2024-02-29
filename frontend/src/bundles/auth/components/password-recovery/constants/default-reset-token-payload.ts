import { type UserVerifyResetTokenRequestDto } from 'shared/build/index.js';

const DEFAULT_RESET_TOKEN_PAYLOAD: Omit<
    UserVerifyResetTokenRequestDto,
    'email'
> = {
    resetToken: '',
} as const;

export { DEFAULT_RESET_TOKEN_PAYLOAD };
