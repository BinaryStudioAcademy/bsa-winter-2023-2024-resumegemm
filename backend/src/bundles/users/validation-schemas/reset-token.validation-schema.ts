import joi from 'joi';

import {
    emailValidationSchema,
    recoveryCodeValidationSchema,
} from './validation-schemas.js';

const resetTokenValidationSchema = joi.object({
    resetToken: recoveryCodeValidationSchema.extract('resetToken'),
    email: emailValidationSchema.extract('email'),
});

export { resetTokenValidationSchema };
