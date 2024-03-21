import { useNavigate } from 'react-router-dom';

import PremiumCrown from '~/assets/img/premium-crown.svg?react';
import { Icon, RegularButton } from '~/bundles/common/components/components';
import { AppRoute } from '~/bundles/common/enums/app-route.enum';
import {
    ButtonVariant,
    IconName,
    IconSize,
} from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { SubscriptionStatus } from '~/bundles/subscription/enums/enums.js';
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

    const handleKeepSubscription = useCallback(() => {
        if (subscription) {
            void dispatch(
                subscriptionActionCreator.keepSubscription(subscription.id),
            );
        }
    }, [dispatch, subscription]);

    useEffect(() => {
        void dispatch(subscriptionActionCreator.getById());
    }, [dispatch]);

    return (
        <div className={styles.profile__info}>
            <div className={styles.profile__info__content}>
                {(!subscription ||
                    subscription.status === SubscriptionStatus.CANCELED) && (
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
                            <RegularButton
                                variant={ButtonVariant.PRIMARY}
                                onClick={handleClickUpgrade}
                                className={styles.upgrade__button}
                            >
                                Upgrade
                            </RegularButton>
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
                                }{' '}
                                plan . Your account will auto-renew on{' '}
                                {subscription.endDate}
                            </p>
                        </div>
                        <div className={styles.profile__info__actions}>
                            <RegularButton
                                variant={ButtonVariant.PRIMARY}
                                onClick={handleCancelSubscription}
                                className={styles.cancel__button}
                            >
                                Cancel
                            </RegularButton>
                        </div>
                    </>
                )}
                {subscription?.status === SubscriptionStatus.ACTIVE &&
                    subscription.isCancelled && (
                        <>
                            <div className={styles.profile__info__icon}>
                                <PremiumCrown />
                            </div>
                            <div className={styles.profile__info__text}>
                                <p className={styles.main__bold}>
                                    Your premium is cancelled
                                </p>
                                <p className={styles.main__regular}>
                                    You subscription ends on{' '}
                                    {subscription.endDate}. At the end of this
                                    period, access to the service will be
                                    limited.
                                </p>
                            </div>
                            <div className={styles.profile__info__actions}>
                                <RegularButton
                                    variant={ButtonVariant.PRIMARY}
                                    onClick={handleKeepSubscription}
                                    className={styles.keep_premium__button}
                                >
                                    <Icon
                                        name={IconName.CROWN}
                                        size={IconSize.SMALL}
                                    />
                                    Keep Premium
                                </RegularButton>
                            </div>
                        </>
                    )}
            </div>
        </div>
    );
};

export { ProfileInfo };
