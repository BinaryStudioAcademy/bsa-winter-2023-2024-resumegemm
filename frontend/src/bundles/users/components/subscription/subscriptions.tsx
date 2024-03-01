import { Modal, RegularButton } from '~/bundles/common/components/components';
import { DataStatus } from '~/bundles/common/enums/data-status.enum';
import { ButtonVariant, ModalVariant } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks';
import {
    subscribe,
    unsubscribe,
} from '~/bundles/email-subscription/store/actions';

import styles from './style.module.scss';
import { SubscriptionItem } from './subscription-item';
import { SubscriptionToggleItem } from './subscription-toggle-item';

const Subscriptions: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const user = useAppSelector((state) => state.auth.user);
    const isEmailSubscriptionLoading = useAppSelector(
        (state) => state.emailSubscription.dataStatus,
    );
    const dispatch = useAppDispatch();

    const handleSubscribe = useCallback(() => {
        void dispatch(subscribe());
    }, [dispatch]);

    const handleUnsubscribe = useCallback(() => {
        if (user?.emailSubscription) {
            void dispatch(unsubscribe({ id: user.emailSubscription.id }));
        }
    }, [dispatch, user]);

    const handleModalOpen = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return (
        <div className={styles.subscription}>
            <SubscriptionToggleItem
                title="Email notifications"
                info="Subscribe to email notifications."
                onClick={
                    user?.emailSubscription ? handleModalOpen : handleSubscribe
                }
                isLoading={isEmailSubscriptionLoading === DataStatus.PENDING}
                buttonText={
                    user?.emailSubscription ? 'Unsubscribe' : 'Subscribe'
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
            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title="Confirm action"
                variant={ModalVariant.CONFIRM}
            >
                <div className={styles.modal}>
                    <p>
                        Are you sure you want to unsubscribe from email
                        notifications?
                    </p>
                    <div className={styles.modal__buttons}>
                        <RegularButton onClick={handleModalClose}>
                            Cancel
                        </RegularButton>
                        <RegularButton
                            onClick={handleUnsubscribe}
                            variant={ButtonVariant.PRIMARY}
                        >
                            Unsubscribe
                        </RegularButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export { Subscriptions };
