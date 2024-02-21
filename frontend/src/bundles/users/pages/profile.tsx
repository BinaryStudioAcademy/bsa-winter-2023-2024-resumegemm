import { PageTitle } from '~/bundles/common/components/page-title/page-title';

import { DeleteAccount } from '../components/delete-account/delete-account';
import { ProfileCard } from '../components/profile-card/profile-card';
import { ProfileForm } from '../components/profile-form/profile-form';
import { ProfileInfo } from '../components/profile-info/profile-info';
import { Socials } from '../components/socials/socials';
import { Subscriptions } from '../components/subscription/subscriptions';
import styles from './style.module.scss';

type User = {
    firstName?: string;
    lastName?: string;
    email?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleFormSubmit = (payload: User): void => {
    // Handle form submission logic here
};

const Profile: React.FC = () => {
    return (
        <div className={styles.profile}>
            <div className={styles.profile__container}>
                <PageTitle title="Account settings" />
                <ProfileCard title="Your plan">
                    <ProfileInfo />
                </ProfileCard>
                <ProfileCard title="Account">
                    <ProfileForm onSubmit={handleFormSubmit} />
                </ProfileCard>
                <ProfileCard title="Social profile">
                    <Socials />
                </ProfileCard>
                <ProfileCard title="Email notifications">
                    <Subscriptions />
                </ProfileCard>
                <ProfileCard title="Delete account">
                    <DeleteAccount />
                </ProfileCard>
            </div>
        </div>
    );
};

export { Profile };
