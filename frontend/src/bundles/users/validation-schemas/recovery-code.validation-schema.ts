import joi from 'joi';
import { type UserVerifyResetTokenRequestDto } from 'shared/build/index.js';

import { RecoveryCodeValidationMessage } from './enums/enums.js';

const recoveryCodeValidationSchema = joi.object<
    Omit<UserVerifyResetTokenRequestDto, 'email'>,
    true
>({
    resetToken: joi.string().trim().required().messages({
        'string.empty': RecoveryCodeValidationMessage.RECOVERY_CODE_REQUIRE,
    }),
});

export { recoveryCodeValidationSchema };
