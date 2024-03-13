const AuthMail = {
    RESET_PASSWORD: {
        subject: 'Resumegemm: Reset password token',
        text: 'Token expires in 10 minutes. Do not show it to anyone. \n\nYour reset password token: ',
    },
} as const;

export { AuthMail };
