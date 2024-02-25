import { type UserSignUpRequestDto } from '~/bundles/users/users';

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD };
