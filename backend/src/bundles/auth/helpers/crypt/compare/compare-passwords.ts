import { hash } from 'bcrypt';

const comparePasswords = async (
    plaintTextPassword: string,
    passwordSalt: string,
    passwordHash: string,
): Promise<boolean> => {
    const dataHash = await hash(plaintTextPassword, passwordSalt);
    return dataHash === passwordHash;
};

export { comparePasswords };
