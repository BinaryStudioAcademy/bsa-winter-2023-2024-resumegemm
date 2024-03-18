import { useNavigate } from 'react-router-dom';

import PremiumCrown from '~/assets/img/premium-crown.svg?react';
import { BaseButton } from '~/bundles/common/components/components';
import { AppRoute } from '~/bundles/common/enums/app-route.enum';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { actions as subscriptionActionCreator } from '~/bundles/subscription/store';

import styles from './style.module.scss';

const ProfileInfo: React.FC = () => {
    const dispatch = useAppDispatch();

    const { subscription } = useAppSelector(({ subscription }) => ({
        subscription: subscription.subscription,
    }));

    const navigate = useNavigate();

    const handleClickUpgrade = useCallback(() => {
        navigate(AppRoute.PAYMENT);
    }, [navigate]);

    const handleCancelSubscription = useCallback(() => {
        navigate(AppRoute.SUBSCRIPTION_CANCEL);
    }, [navigate]);

    useEffect(() => {
        void dispatch(subscriptionActionCreator.getById());
    }, [dispatch]);

    return (
        <div className={styles.profile__info}>
            <div className={styles.profile__info__content}>
                {(!subscription || subscription.isCancelled) && (
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
                                onClick={handleClickUpgrade}
                                className={styles.upgrade__button}
                            >
                                Upgrade
                            </BaseButton>
                        </div>
                    </>
                )}
                {subscription && !subscription.isCancelled && (
                    <>
                        <div className={styles.profile__info__icon}>
                            <PremiumCrown />
                        </div>
                        <div className={styles.profile__info__text}>
                            <p className={styles.main__bold}>Premium account</p>
                            <p className={styles.main__regular}>
                                You are on{' '}
                                {
                                    subscription.subscriptionPlan
                                        .stripeProductName
                                }
                                . Your account will auto-renew on{' '}
                                {subscription.endDate}
                            </p>
                        </div>
                        <div className={styles.profile__info__actions}>
                            <BaseButton
                                onClick={handleCancelSubscription}
                                className={styles.cancel__button}
                            >
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
