type UserSignUpRequestDto = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    emailConfirmed?: boolean;
};

export { type UserSignUpRequestDto };
