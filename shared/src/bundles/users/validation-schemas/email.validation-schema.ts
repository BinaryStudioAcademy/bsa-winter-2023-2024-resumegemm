import joi from 'joi';

import {
    type UserForgotPasswordRequestDto,
    UserValidationMessage,
} from '../users.js';

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
            'string.email': UserValidationMessage.EMAIL_WRONG,
            'string.empty': UserValidationMessage.EMAIL_REQUIRE,
        }),
});

export { emailValidationSchema };
