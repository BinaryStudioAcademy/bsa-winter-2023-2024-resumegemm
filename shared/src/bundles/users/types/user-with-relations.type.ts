import { type EmailSubscription } from '~/bundles/email-subscriptions/email-subscriptions';
import { type OauthConnectionEntityFields } from '~/bundles/open-auth/open-auth';
import { type Profile } from '~/bundles/profile/profile';

import { type User } from './user.type';

type UserWithRelations = Omit<User, 'emailSubscriptionId'> & {
    userProfile: Profile;
    emailSubscription: EmailSubscription | null;
    oauth_connections: OauthConnectionEntityFields[];
};

export { type UserWithRelations };
