type UserResetPasswordRequestDto = {
    password: string;
    email: string;
    resetPasswordToken: string;
};

export { type UserResetPasswordRequestDto };
