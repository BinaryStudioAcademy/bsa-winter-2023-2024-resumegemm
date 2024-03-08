import { type User } from './user.type';

type UserEntityFields = Omit<User, 'createdAt' | 'updatedAt'> & {
    passwordHash: string | null;
    passwordSalt: string | null;
};

export { type UserEntityFields };
