import { PageTitle } from '~/bundles/common/components/page-title/page-title';

import { ProfileCard } from '../components/profile-card/profile-card';
import { ProfileForm } from '../components/profile-form/profile-form';
import { ProfileInfo } from '../components/profile-info/profile-info';
import styles from './style.module.scss';

type User = {
    firstName?: string;
    lastName?: string;
    email?: string;
};

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
                <ProfileCard title="Socials">bla</ProfileCard>
                <ProfileCard title="Subscription">
                    <ProfileForm onSubmit={handleFormSubmit} />
                </ProfileCard>
                <ProfileCard title="Delete account">
                    <ProfileForm onSubmit={handleFormSubmit} />
                </ProfileCard>
            </div>
        </div>
    );
};

export { Profile };
