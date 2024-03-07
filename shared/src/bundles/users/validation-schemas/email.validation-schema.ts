import joi from 'joi';

import {
    type UserForgotPasswordRequestDto,
    UserValidationMessage,
    UserValidationRule,
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
        .custom((value, helpers) => {
            const [localPart, domain] = value.split('@')[0];

            if (localPart.length <= 1) {
                return helpers.error('string.emailInvalid');
            }

            if (domain.length > UserValidationRule.EMAIL_MAX_DOMAIN_LENGTH) {
                return helpers.error('domainLengthInvalid');
            }

            return value;
        })
        .messages({
            'string.email': UserValidationMessage.EMAIL_WRONG,
            'string.empty': UserValidationMessage.EMAIL_REQUIRE,
            'domainLengthInvalid': UserValidationMessage.EMAIL_INVALID,
            'string.emailInvalid': UserValidationMessage.EMAIL_INVALID,
        }),
});

export { emailValidationSchema };
