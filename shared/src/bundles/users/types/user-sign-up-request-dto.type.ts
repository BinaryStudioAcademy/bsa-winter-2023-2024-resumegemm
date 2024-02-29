type UserSignUpRequestDto = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirm_password: string;
    emailConfirmed: boolean | undefined;
};

export { type UserSignUpRequestDto };
