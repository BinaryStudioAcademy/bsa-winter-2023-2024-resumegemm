import { type User } from './user.type';

type UserEntityFields = Omit<User, 'createdAt' | 'updatedAt'> & {
    passwordHash: string;
    passwordSalt: string;
};

export { type UserEntityFields };
