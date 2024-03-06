import { type UserSignInRequestDto } from '~/bundles/users/users';

import { type UserSignUpRequestDtoFrontend } from '../validation/sign-up-validation';

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDtoFrontend = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    // confirm_password?: '',
    // emailConfirmed: false
};

const DEFAULT_SIGN_IN_PAYLOAD: UserSignInRequestDto = {
    email: '',
    password: '',
};

export { DEFAULT_SIGN_IN_PAYLOAD, DEFAULT_SIGN_UP_PAYLOAD };
