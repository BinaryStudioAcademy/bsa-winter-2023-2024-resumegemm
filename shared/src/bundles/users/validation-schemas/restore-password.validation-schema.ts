import joi from 'joi';

import { type UserResetPassword } from '../types/user-reset-password.type.js';
import { UserValidationMessage, UserValidationRule } from '../users.js';

const passwordValidationSchema = joi.object<UserResetPassword, true>({
    password: joi
        .string()
        .regex(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~])(?=\S{8,64}$).*$/,
        )
        .min(UserValidationRule.PASSWORD_MIN_LENGTH)
        .max(UserValidationRule.PASSWORD_MAX_LENGTH)
        .required()
        .messages({
            'string.empty': UserValidationMessage.PASSWORD_REQUIRED,
            'string.pattern.base': UserValidationMessage.PASSWORD_INVALID,
            'string.min': UserValidationMessage.PASSWORD_INVALID,
            'string.max': UserValidationMessage.PASSWORD_INVALID,
        }),
    confirmPassword: joi
        .string()
        .required()
        .valid(joi.ref('password'))
        .messages({
            'any.only': UserValidationMessage.CONFIRM_PASSWORD_MATCH,
        }),
});

export { passwordValidationSchema };
