enum UserValidationMessage {
    FIRSTNAME_REQUIRE = 'First name is required',
    FIRSTNAME_SHORT = 'First name length must be at least 2 characters long',
    FIRSTNAME_LONG = 'First name length must be less than or equal to 50 characters long',
    LASTNAME_REQUIRE = 'Last name is required',
    LASTNAME_SHORT = 'Last name length must be at least 2 characters long',
    LASTNAME_LONG = 'Last name length must be less than or equal to 50 characters long',
    EMAIL_REQUIRE = 'Email is required',
    EMAIL_WRONG = 'Email is wrong',
    PASSWORD_REQUIRED = 'Password is required',
    PASSWORD_INVALID = 'Invalid password.Use 8-64 characters, mix uppercase, lowercase, numbers, and special characters. No spaces allowed',
    CONFIRM_PASSWORD_REQUIRED = 'Confirm password required',
    CONFIRM_PASSWORD_MATCH = 'Confirm password should match the password',
}

export { UserValidationMessage };
