import joi from 'joi';

import {
    emailValidationSchema,
    passwordValidationSchema,
    recoveryCodeValidationSchema,
} from './validation-schemas.js';

const resetPasswordValidatioSchema = joi.object({
    email: emailValidationSchema.extract('email'),
    password: passwordValidationSchema.extract('password'),
    resetPasswordToken:
        recoveryCodeValidationSchema.extract('resetPasswordToken'),
});

export { resetPasswordValidatioSchema };
