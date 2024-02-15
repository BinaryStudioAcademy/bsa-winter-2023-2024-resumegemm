import { genSaltSync, hashSync } from 'bcrypt';

const USER_PASSWORD_SALT_ROUNDS = 10;

type EncryptPasswordReturnType = {
    salt: string;
    hash: string;
};

const encryptPassword = (password: string): EncryptPasswordReturnType => {
    const salt = genSaltSync(USER_PASSWORD_SALT_ROUNDS);
    const hash = hashSync(password, salt);
    return {
        salt,
        hash,
    };
};

export { encryptPassword };
