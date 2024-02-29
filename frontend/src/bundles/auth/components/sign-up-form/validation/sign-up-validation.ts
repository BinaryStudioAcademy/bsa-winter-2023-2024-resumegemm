import joi from 'joi';
import { UserValidationMessage } from 'shared/build/bundles/users/users';

type UserSignUpRequestDtoFrontend = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirm_password: string;
    // emailConfirmed: boolean;
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
        .required()
        .messages({
            'string.email': UserValidationMessage.EMAIL_WRONG,
            'string.empty': UserValidationMessage.EMAIL_REQUIRE,
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
    // emailConfirmed: joi.boolean()
});

export { type UserSignUpRequestDtoFrontend };
export { userSignUpValidationFrontend };
