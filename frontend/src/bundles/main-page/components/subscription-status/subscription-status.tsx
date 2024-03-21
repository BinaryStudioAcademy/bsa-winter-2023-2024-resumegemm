import { Icon, RegularButton } from '~/bundles/common/components/components';
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
import { actions as subscriptionActionCreator } from '~/bundles/subscription/store';

import styles from './styles.module.scss';

const SubscriptionStatus = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { subscription } = useAppSelector(({ subscription }) => ({
        subscription: subscription.subscription,
    }));

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
        <div className={styles.subscription_status}>
            {subscription?.isCancelled && (
                <>
                    <div className={styles.subscription_status_days}>
                        <div className={styles.subscription_status__icon}>
                            <Icon name={IconName.CROWN} size={IconSize.SMALL} />
                        </div>
                        {subscription.endDate}
                    </div>
                    <div className={styles.subscription_status__button}>
                        <RegularButton
                            onClick={handleKeepSubscription}
                            variant={ButtonVariant.PRIMARY}
                        >
                            Keep Premium
                        </RegularButton>
                    </div>
                </>
            )}
        </div>
    );
};

export { SubscriptionStatus };
