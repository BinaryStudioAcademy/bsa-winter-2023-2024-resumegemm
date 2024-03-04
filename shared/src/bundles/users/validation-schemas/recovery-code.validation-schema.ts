import joi from 'joi';

import { RecoveryCodeValidationMessage } from '../enums/recovery-code.validation-message.js';
import { type UserVerifyResetTokenRequestDto } from '../users.js';

const recoveryCodeValidationSchema = joi.object<
    Omit<UserVerifyResetTokenRequestDto, 'email'>,
    true
>({
    resetToken: joi.string().trim().required().messages({
        'string.empty': RecoveryCodeValidationMessage.RECOVERY_CODE_REQUIRE,
    }),
});

export { recoveryCodeValidationSchema };
