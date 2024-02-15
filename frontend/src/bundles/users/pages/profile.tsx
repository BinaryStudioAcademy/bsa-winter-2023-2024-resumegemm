import { Button } from '~/bundles/common/components/components';
import { PageTitle } from '~/bundles/common/components/page-title/page-title';

import { ProfileForm } from '../components/profile-form/profile-form';
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
                <PageTitle title='Account settings' />
                <div className={styles.profile__content}>
                    <div className={styles.profile__card__title}>
                        <span>Your plan</span>
                    </div>
                    <div className={styles.profile__card}>
                        <div className={styles.profile__card__content}>
                            <div className={styles.profile__card__icon}>
                                <img
                                    src={'https://resume.io/assets/media/account_free_newaf14cca16ac227108062.svg'}
                                    alt="Upgrade for PDF downloads &amp; premium features."
                                />
                            </div>
                            <div className={styles.profile__card__text}>
                                <p className={styles.main__bold}>Free account</p>
                                <p className={styles.main__regular}>You are on free plan. You can save your data and search for jobs. Upgrade for PDF downloads & premium features.</p>
                            </div>
                        </div>
                        <div className={styles.profile__card__actions}>
                            <Button>Upgrade</Button>
                        </div>
                    </div>
                </div>
                <div className={styles.profile__content}>
                    <div className={styles.profile__card__title}>
                        <span>Account</span>
                    </div>
                    <div className={styles.profile__card}>
                        <ProfileForm onSubmit={handleFormSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Profile };
