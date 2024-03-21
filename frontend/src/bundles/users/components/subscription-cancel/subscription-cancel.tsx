import { useNavigate } from 'react-router-dom';

import {
    Icon,
    RegularButton,
    Spinner,
} from '~/bundles/common/components/components';
import { AppRoute } from '~/bundles/common/enums/app-route.enum';
import {
    ButtonSize,
    ButtonVariant,
    DataStatus,
    IconName,
    IconSize,
    SpinnerVariant,
} from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks';
import { actions as subscriptionActionCreator } from '~/bundles/subscription/store';

import { SubscriptionCancelResult } from './components/subscription-cancelled-result/subscription-cancelled-result';
import styles from './style.module.scss';

const SubscriptionCancel: React.FC = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const [isSubscriptionDeleted, setIsSubscriptionDeleted] = useState(false);

    const { subscription, dataStatus } = useAppSelector(({ subscription }) => ({
        subscription: subscription.subscription,
        dataStatus: subscription.dataStatus,
    }));

    const handleDeleteSubscription = useCallback(() => {
        if (subscription) {
            void dispatch(
                subscriptionActionCreator.cancelSubscription(subscription.id),
            );
            setIsSubscriptionDeleted(true);
        }
    }, [subscription, dispatch]);

    useEffect(() => {
        void dispatch(subscriptionActionCreator.getById());
    }, [dispatch]);

    const handleStayPremium = useCallback(() => {
        navigate(AppRoute.HOME);
    }, [navigate]);

    return (
        <div className={styles.subscription_cancel_container}>
            {!isSubscriptionDeleted && (
                <>
                    <div className={styles.subscription_cancel_info}>
                        <h3 className={styles.subscription_cancel_info__title}>
                            Your documents will be limited
                        </h3>
                        <div
                            className={styles.subscription_cancel_info__content}
                        >
                            <div className={styles.cancel_info__content_item}>
                                <Icon
                                    className={styles.cancel_info__icon}
                                    name={IconName.FILE}
                                    size={IconSize.SMALL}
                                />
                                <p className={styles.cancel_info__text}>
                                    Only{' '}
                                    <span
                                        className={
                                            styles.cancel_info__main_text
                                        }
                                    >
                                        one resume
                                    </span>{' '}
                                    and{' '}
                                    <span
                                        className={
                                            styles.cancel_info__main_text
                                        }
                                    >
                                        one cover letter
                                    </span>
                                </p>
                            </div>
                            <div className={styles.cancel_info__content_item}>
                                <Icon
                                    className={styles.cancel_info__icon}
                                    name={IconName.SHIELD_ALT}
                                    size={IconSize.SMALL}
                                />
                                <p className={styles.cancel_info__text}>
                                    Only{' '}
                                    <span
                                        className={
                                            styles.cancel_info__main_text
                                        }
                                    >
                                        three attempts for AI usage
                                    </span>{' '}
                                    now you have unlimited
                                </p>
                            </div>
                            <div className={styles.cancel_info__content_item}>
                                <Icon
                                    className={styles.cancel_info__icon}
                                    name={IconName.DOWNLOAD}
                                    size={IconSize.SMALL}
                                />
                                <p className={styles.cancel_info__text}>
                                    No downloads or export for you documents,
                                    only share link
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.subscription_cancel_buttons}>
                        <RegularButton
                            onClick={handleStayPremium}
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.MEDIUM}
                        >
                            {' '}
                            Stay Premium
                        </RegularButton>
                        <RegularButton
                            onClick={handleDeleteSubscription}
                            variant={ButtonVariant.GHOST}
                            size={ButtonSize.MEDIUM}
                        >
                            Continue with cancellation
                        </RegularButton>
                    </div>
                </>
            )}

            {dataStatus === DataStatus.PENDING && (
                <div className={styles.subscription_cancel_spinner}>
                    <Spinner variant={SpinnerVariant.MEDIUM} />
                </div>
            )}

            {isSubscriptionDeleted && dataStatus === DataStatus.FULFILLED && (
                <SubscriptionCancelResult />
            )}
        </div>
    );
};

export { SubscriptionCancel };
