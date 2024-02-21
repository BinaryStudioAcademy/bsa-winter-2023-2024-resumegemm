import { BaseButton } from '~/bundles/common/components/components';

import styles from './style.module.scss';

const ProfileInfo: React.FC = () => {
    return (
        <div className={styles.profile__info}>
            <div className={styles.profile__info__content}>
                <div className={styles.profile__info__icon}>
                    <img
                        src={
                            'https://resume.io/assets/media/account_free_newaf14cca16ac227108062.svg'
                        }
                        alt="Upgrade for PDF downloads &amp; premium features."
                    />
                </div>
                <div className={styles.profile__info__text}>
                    <p className={styles.main__bold}>Free account</p>
                    <p className={styles.main__regular}>
                        You are on free plan. You can save your data and search for
                        jobs. Upgrade for PDF downloads & premium features.
                    </p>
                </div>
            </div>
            <div className={styles.profile__info__actions}>
                <BaseButton>Upgrade</BaseButton>
            </div>
        </div>
    );
};

export { ProfileInfo };
