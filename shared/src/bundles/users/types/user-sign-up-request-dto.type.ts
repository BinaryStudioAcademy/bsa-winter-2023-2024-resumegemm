type UserSignUpRequestDto = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    emailConfirmed?: boolean;
};

export { type UserSignUpRequestDto };
