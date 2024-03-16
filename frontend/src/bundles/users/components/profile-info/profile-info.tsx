import { useNavigate } from 'react-router-dom';

import PremiumQueen from '~/assets/img/premium-queen.svg?react';
import { BaseButton } from '~/bundles/common/components/components';
import { AppRoute } from '~/bundles/common/enums/app-route.enum';
import { useAppSelector, useCallback } from '~/bundles/common/hooks/hooks';

import styles from './style.module.scss';

const ProfileInfo: React.FC = () => {
    const { subscription } = useAppSelector(({ subscription }) => ({
        subscription: subscription.subscription,
    }));

    const navigate = useNavigate();
    const handleClick = useCallback(() => {
        navigate(AppRoute.PAYMENT);
    }, [navigate]);

    return (
        <div className={styles.profile__info}>
            <div className={styles.profile__info__content}>
                {!subscription && (
                    <>
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
                                You are on free plan. You can save your data and
                                search for jobs. Upgrade for PDF downloads &
                                premium features.
                            </p>
                        </div>
                        <div className={styles.profile__info__actions}>
                            <BaseButton
                                onClick={handleClick}
                                className={styles.upgrade__button}
                            >
                                Upgrade
                            </BaseButton>
                        </div>
                    </>
                )}
                {subscription && (
                    <>
                        <div className={styles.profile__info__icon}>
                            <PremiumQueen />
                        </div>
                        <div className={styles.profile__info__text}>
                            <p className={styles.main__bold}>Premium account</p>
                            <p className={styles.main__regular}>
                                You are on premium subscription. Your account
                                will auto-renew on {subscription.endDate}
                            </p>
                        </div>
                        <div className={styles.profile__info__actions}>
                            <BaseButton className={styles.cancel__button}>
                                Cancel
                            </BaseButton>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export { ProfileInfo };
