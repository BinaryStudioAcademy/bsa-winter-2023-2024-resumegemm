import joi from 'joi';
import { UserValidationMessage } from 'shared/build/bundles/users/users';

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
        .trim()
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
    password: joi.string().trim().required().messages({
        'string.empty': UserValidationMessage.PASSWORD_REQUIRED,
    }),
    confirm_password: joi
        .string()
        .trim()
        .valid(joi.ref('password'))
        .required()
        .messages({
            'any.only': UserValidationMessage.CONFIRM_PASSWORD_MATCH,
            'string.empty': UserValidationMessage.CONFIRM_PASSWORD_REQUIRED,
        }),
});

export { type UserSignUpRequestDtoFrontend };
export { userSignUpValidationFrontend };
