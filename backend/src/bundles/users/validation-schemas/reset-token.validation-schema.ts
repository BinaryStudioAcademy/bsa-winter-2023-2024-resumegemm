import joi from 'joi';

import {
    emailValidationSchema,
    recoveryCodeValidationSchema,
} from './validation-schemas.js';

const resetPasswordTokenValidationSchema = joi.object({
    resetPasswordToken:
        recoveryCodeValidationSchema.extract('resetPasswordToken'),
    email: emailValidationSchema.extract('email'),
});

export { resetPasswordTokenValidationSchema };
