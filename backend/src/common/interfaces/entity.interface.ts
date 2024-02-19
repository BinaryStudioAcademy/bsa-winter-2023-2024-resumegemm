import { type UserEntityFields } from 'shared/build/index.js';

interface IEntity {
    toObject(): Pick<UserEntityFields, 'id' | 'email'>;

    toNewObject(): UserEntityFields;
}

export { type IEntity };
