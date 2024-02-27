import { type UserEntityFields } from 'shared/build/index.js';

import { type IEntity } from '~/common/interfaces/interfaces.js';

class UserEntity implements IEntity {
    private 'id': string | null;

    private 'email': string;

    private 'profileId': string;

    private 'emailSubscriptionId': string | null;

    private 'passwordHash': string;

    private 'passwordSalt': string;

    private constructor({
        id,
        email,
        profileId,
        emailSubscriptionId,
        passwordHash,
        passwordSalt,
    }: UserEntityFields) {
        this.id = id;
        this.email = email;
        this.profileId = profileId;
        this.emailSubscriptionId = emailSubscriptionId;
        this.passwordHash = passwordHash;
        this.passwordSalt = passwordSalt;
    }

    public static initialize({
        id,
        email,
        profileId,
        emailSubscriptionId,
        passwordHash,
        passwordSalt,
    }: UserEntityFields): UserEntity {
        return new UserEntity({
            id,
            email,
            profileId,
            emailSubscriptionId,
            passwordHash,
            passwordSalt,
        });
    }

    public static initializeNew({
        email,
        profileId,
        passwordHash,
        passwordSalt,
    }: Omit<UserEntityFields, 'id' | 'emailSubscriptionId'>): UserEntity {
        return {
            email,
            profileId,
            emailSubscriptionId: null,
            passwordHash,
            passwordSalt,
        } as unknown as UserEntity;
    }

    public toObject(): Pick<UserEntityFields, 'id' | 'email'> {
        return {
            id: this.id as string,
            email: this.email,
        };
    }

    public toNewObject(): UserEntityFields {
        return {
            id: this.id as NonNullable<string>,
            profileId: this.profileId,
            emailSubscriptionId: this.emailSubscriptionId,
            email: this.email,
            passwordHash: this.passwordHash,
            passwordSalt: this.passwordSalt,
        };
    }
}

export { UserEntity };
