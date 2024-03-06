import joi from 'joi';
import {
    UserValidationMessage,
    UserValidationRule,
} from 'shared/build/bundles/users/users';

type UserSignUpRequestDtoFrontend = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirm_password?: string;
};

const userSignUpValidationFrontend = joi.object<
    UserSignUpRequestDtoFrontend,
    true
>({
    firstName: joi.string().min(2).max(50).trim().required().messages({
        'string.empty': UserValidationMessage.FIRSTNAME_REQUIRE,
        'string.min': UserValidationMessage.FIRSTNAME_SHORT,
        'string.max': UserValidationMessage.FIRSTNAME_LONG,
    }),
    lastName: joi.string().min(2).max(50).trim().required().messages({
        'string.empty': UserValidationMessage.LASTNAME_REQUIRE,
        'string.min': UserValidationMessage.LASTNAME_SHORT,
        'string.max': UserValidationMessage.LASTNAME_LONG,
    }),
    email: joi
        .string()
        .email({
            tlds: {
                allow: false,
            },
        })
        .custom((value, helpers) => {
            const [localPart] = value.split('@');
            if (localPart.length <= 1) {
                return helpers.error('string.emailInvalid');
            }
            return value;
        })
        .required()
        .messages({
            'string.email': UserValidationMessage.EMAIL_WRONG,
            'string.empty': UserValidationMessage.EMAIL_REQUIRE,
            'string.emailInvalid': UserValidationMessage.EMAIL_INVALID,
        }),
    password: joi
        .string()
        .min(UserValidationRule.PASSWORD_MIN_LENGTH)
        .max(UserValidationRule.PASSWORD_MAX_LENGTH)
        .regex(/^\S*$/)
        .required()
        .messages({
            'string.empty': UserValidationMessage.PASSWORD_REQUIRED,
            'string.pattern.base': UserValidationMessage.PASSWORD_INVALID,
            'string.min': UserValidationMessage.PASSWORD_INVALID,
            'string.max': UserValidationMessage.PASSWORD_INVALID,
        }),
    confirm_password: joi
        .string()
        .valid(joi.ref('password'))
        .required()
        .messages({
            'any.only': UserValidationMessage.CONFIRM_PASSWORD_MATCH,
            'string.empty': UserValidationMessage.CONFIRM_PASSWORD_REQUIRED,
        }),
});

export { type UserSignUpRequestDtoFrontend };
export { userSignUpValidationFrontend };
