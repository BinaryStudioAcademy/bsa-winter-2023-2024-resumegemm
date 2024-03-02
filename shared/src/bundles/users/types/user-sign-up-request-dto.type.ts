type UserSignUpRequestDto = {
    firstName: string;
    lastName: string | null;
    email: string;
    password: string | null;
};

export { type UserSignUpRequestDto };
