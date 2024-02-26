import { DataStatus } from '~/bundles/common/enums/data-status.enum';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks';
import {
    subscribe,
    unsubscribe,
} from '~/bundles/email-subscription/store/actions';

import styles from './style.module.scss';
import { SubscriptionItem } from './subscription-item';
import { SubscriptionToggleItem } from './subscription-toggle-item';

const Subscriptions: React.FC = () => {
    const user = useAppSelector((state) => state.auth.user);
    const isEmailSubscriptionLoading = useAppSelector(
        (state) => state.emailSubscription.dataStatus,
    );
    const dispatch = useAppDispatch();

    const handleSubscribe = useCallback(() => {
        void dispatch(subscribe());
    }, [dispatch]);

    const handleUnsubscribe = useCallback(() => {
        if (user?.user.emailSubscription.id) {
            void dispatch(unsubscribe({ id: user.user.emailSubscription.id }));
        }
    }, [dispatch, user]);

    return (
        <div className={styles.subscription}>
            <SubscriptionToggleItem
                title="Email notifications"
                info="Subscribe to email notifications."
                onClick={
                    user?.user.emailSubscription
                        ? handleUnsubscribe
                        : handleSubscribe
                }
                isLoading={isEmailSubscriptionLoading === DataStatus.PENDING}
                buttonText={
                    user?.user.emailSubscription ? 'Unsubscribe' : 'Subscribe'
                }
            />
            <SubscriptionItem
                title="Resume Analytics"
                info="Discounts, special offers, new features and more."
            />
            <SubscriptionItem
                title="Resume and Job Tips Newsletter"
                info="Views, downloads and monthly statistics for each resume."
            />
            <SubscriptionItem
                title="Resume and Job Tips Newsletter"
                info="Useful resume and job tips! Straight to your inbox every 2 weeks."
            />
            <SubscriptionItem
                title="Career Plans"
                info="Get notified when career planning is available."
            />
        </div>
    );
};

export { Subscriptions };
