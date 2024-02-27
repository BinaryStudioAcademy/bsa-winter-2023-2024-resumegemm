import { type EmailSubscription } from '~/bundles/email-subscriptions/email-subscriptions';
import { type Profile } from '~/bundles/profile/profile';

import { type User } from './user.type';

type UserWithRelations = Omit<User, 'emailSubscriptionId'> & {
    user_profile: Profile;
    emailSubscription: EmailSubscription | null;
};

export { type UserWithRelations };
