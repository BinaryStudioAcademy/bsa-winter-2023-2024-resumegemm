import joi from 'joi';

import { RecoveryCodeValidationMessage } from '../enums/recovery-code.validation-message.js';
import { type UserVerifyResetPasswordTokenRequestDto } from '../users.js';

const recoveryCodeValidationSchema = joi.object<
    Omit<UserVerifyResetPasswordTokenRequestDto, 'email'>,
    true
>({
    resetPasswordToken: joi.string().trim().required().messages({
        'string.empty': RecoveryCodeValidationMessage.RECOVERY_CODE_REQUIRE,
    }),
});

export { recoveryCodeValidationSchema };
