import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserSignUpRequestDto } from '../types/types.js';

const userSignUp = joi.object<UserSignUpRequestDto, true>({
    firstName: joi.string().trim().required().messages({
        'string.empty': UserValidationMessage.FIRSTNAME_REQUIRE,
    }),
    lastName: joi.string().trim().required().messages({
        'string.empty': UserValidationMessage.LASTNAME_REQUIRE,
    }),
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
    password: joi.string().trim().required(),
    repeatPassword: joi.string().trim().required(),
});

export { userSignUp };
