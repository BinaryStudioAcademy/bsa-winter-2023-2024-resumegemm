import { type UserSignUpRequestDto } from '~/bundles/users/users';

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD };
