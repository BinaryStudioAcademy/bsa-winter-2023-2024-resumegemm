import joi from 'joi';

import { type UserResetPassword } from '../types/user-reset-password.type.js';
import { UserValidationMessage } from '../users.js';

const passwordValidationSchema = joi.object<UserResetPassword, true>({
    password: joi.string().regex(/^\S*$/).min(8).max(64).messages({
        'string.empty': UserValidationMessage.PASSWORD_REQUIRED,
        'string.min': UserValidationMessage.PASSWORD_INVALID,
        'string.max': UserValidationMessage.PASSWORD_INVALID,
        'string.pattern.base': UserValidationMessage.PASSWORD_INVALID,
    }),
    confirm_password: joi
        .string()
        .required()
        .valid(joi.ref('password'))
        .messages({
            'any.only': UserValidationMessage.CONFIRM_PASSWORD_MATCH,
        }),
});

export { passwordValidationSchema };
