import { type UserAuthResponse } from '~/bundles/users/types/user-auth-response.type';

type UserEntityFields = Omit<
    UserAuthResponse['user'],
    'createdAt' | 'updatedAt'
> & {
    passwordHash: string | null;
    passwordSalt: string | null;
};

export { type UserEntityFields };
