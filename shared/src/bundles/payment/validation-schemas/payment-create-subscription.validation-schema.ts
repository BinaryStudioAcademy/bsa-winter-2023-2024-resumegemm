import joi from 'joi';

import { PaymentValidationMessage } from '../enums/enums.js';
import { type CreateSubscriptionRequestDto } from '../types/types.js';

const paymentCreateSubscriptionValidationSchema = joi.object<
    CreateSubscriptionRequestDto,
    true
>({
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
            'string.email': PaymentValidationMessage.EMAIL_WRONG,
            'string.empty': PaymentValidationMessage.EMAIL_REQUIRE,
        }),
    name: joi.string().trim().required(),
    paymentMethod: joi.string().trim().required(),
    priceId: joi.string().trim().required(),
});

export { paymentCreateSubscriptionValidationSchema };
