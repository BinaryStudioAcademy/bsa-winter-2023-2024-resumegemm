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
    firstName: joi.string().trim().required().messages({
        'string.empty': UserValidationMessage.FIRSTNAME_REQUIRE,
    }),
    lastName: joi.string().trim().required().messages({
        'string.empty': UserValidationMessage.LASTNAME_REQUIRE,
    }),
    email: joi
        .string()
        .email({
            tlds: {
                allow: false,
            },
        })
        .required()
        .custom((value, helpers) => {
            const domain = value.split('@')[1];

            if (domain.length > UserValidationRule.EMAIL_MAX_DOMAIN_LENGTH) {
                return helpers.error('domainLengthInvalid');
            }

            return value;
        })
        .messages({
            'string.email': UserValidationMessage.EMAIL_WRONG,
            'string.empty': UserValidationMessage.EMAIL_REQUIRE,
            'domainLengthInvalid': UserValidationMessage.EMAIL_INVALID,
        }),
    password: joi.string().regex(/^\S*$/).required().messages({
        'string.empty': UserValidationMessage.PASSWORD_REQUIRED,
        'string.pattern.base': UserValidationMessage.PASSWORD_INVALID,
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
