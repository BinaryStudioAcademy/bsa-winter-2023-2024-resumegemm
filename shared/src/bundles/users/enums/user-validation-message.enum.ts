enum UserValidationMessage {
    FIRSTNAME_REQUIRE = 'First name is required',
    LASTNAME_REQUIRE = 'Last name is required',
    EMAIL_REQUIRE = 'Email is required',
    EMAIL_WRONG = 'Email is wrong',
    PASSWORD_REQUIRED = 'Password is required',
    PASSWORD_NO_SPACES = 'No spaces allowed',
    CONFIRM_PASSWORD_REQUIRED = 'Confirm password required',
    CONFIRM_PASSWORD_MATCH = 'Confirm password should match the password',
}

export { UserValidationMessage };
