import { compare } from 'bcrypt';

const comparePasswords = (
    data: string,
    encryptedPassword: string,
): Promise<boolean> => {
    return compare(data, encryptedPassword);
};

export { comparePasswords };
