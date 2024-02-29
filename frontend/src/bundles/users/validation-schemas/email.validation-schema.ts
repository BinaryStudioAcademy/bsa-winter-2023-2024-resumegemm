import joi from 'joi';

import { type UserForgotPasswordRequestDto } from '../users.js';
import { EmailValidationMessage } from './enums/enums.js';

const emailValidationSchema = joi.object<UserForgotPasswordRequestDto, true>({
    email: joi
        .string()
        .trim()
        .email({
            tlds: {
                allow: false,
            },
        })
        .required()
        .messages({
            'string.email': EmailValidationMessage.EMAIL_WRONG,
            'string.empty': EmailValidationMessage.EMAIL_REQUIRE,
        }),
});

export { emailValidationSchema };
