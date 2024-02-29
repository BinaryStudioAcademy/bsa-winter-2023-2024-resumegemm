import joi from 'joi';

import { type UserResetPassword } from '~/bundles/auth/components/password-recovery/types/user-reset-password.type.js';

import { RestorePasswordValidationMessage } from './enums/enums.js';

const passwordValidationSchema = joi.object<UserResetPassword, true>({
    password: joi.string().trim().required().min(8).messages({
        'string.empty': RestorePasswordValidationMessage.PASSWORD_REQUIRE,
        'string.min': RestorePasswordValidationMessage.WRONG_PASSWORD_LENGTH,
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
