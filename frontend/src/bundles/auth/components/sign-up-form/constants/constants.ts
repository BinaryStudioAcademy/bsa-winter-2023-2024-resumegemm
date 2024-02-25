import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/users/users';

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
};

const DEFAULT_SIGN_IN_PAYLOAD: UserSignInRequestDto = {
    email: '',
    password: '',
};

export { DEFAULT_SIGN_IN_PAYLOAD, DEFAULT_SIGN_UP_PAYLOAD };
