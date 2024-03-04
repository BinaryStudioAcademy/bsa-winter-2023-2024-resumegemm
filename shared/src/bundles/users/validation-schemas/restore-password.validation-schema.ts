import joi from 'joi';

import { RestorePasswordValidationMessage } from '../enums/password.validation-message.js';
import { type UserResetPassword } from '../types/user-reset-password.type.js';

const passwordValidationSchema = joi.object<UserResetPassword, true>({
    password: joi.string().trim().required().min(8).max(64).messages({
        'string.empty': RestorePasswordValidationMessage.PASSWORD_REQUIRE,
        'string.min': RestorePasswordValidationMessage.INVALID_PASSWORD,
        'string.max': RestorePasswordValidationMessage.INVALID_PASSWORD,
    }),
    repeat_password: joi
        .string()
        .required()
        .valid(joi.ref('password'))
        .messages({
            'any.only': RestorePasswordValidationMessage.PASSWORDS_DONT_MATCH,
        }),
});

export { passwordValidationSchema };
