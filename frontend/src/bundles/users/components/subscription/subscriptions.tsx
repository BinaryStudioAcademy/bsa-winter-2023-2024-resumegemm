import { Modal, RegularButton } from '~/bundles/common/components/components';
import { ButtonVariant, ModalVariant } from '~/bundles/common/enums/enums';
import {
    useAppSelector,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks';
import { useEmailSubscriptions } from '~/bundles/common/hooks/use-email-subscriptions/use-email-subscriptions.hook';

import styles from './style.module.scss';
import { SubscriptionItem } from './subscription-item';
import { SubscriptionToggleItem } from './subscription-toggle-item';

const Subscriptions: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const emailSubscription = useAppSelector(
        (state) => state.auth.user?.emailSubscription,
    );

    const { handleSubscribe, handleUnsubscribe, isEmailSubscriptionLoading } =
        useEmailSubscriptions();

    const handleModalOpen = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleUnsubscribeAndCloseModal = useCallback(() => {
        handleUnsubscribe();
        setIsModalOpen(false);
    }, [handleUnsubscribe]);

    const toggleItemProperties = emailSubscription
        ? {
              title: 'Email notifications',
              info: 'Unsubscribe from email notifications.',
              onClick: handleModalOpen,
              isLoading: isEmailSubscriptionLoading,
              buttonText: 'Unsubscribe',
          }
        : {
              title: 'Email notifications',
              info: 'Subscribe to email notifications.',
              onClick: handleSubscribe,
              isLoading: isEmailSubscriptionLoading,
              buttonText: 'Subscribe',
          };

    return (
        <div className={styles.subscription}>
            <SubscriptionToggleItem {...toggleItemProperties} />
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
                            onClick={handleUnsubscribeAndCloseModal}
                            variant={ButtonVariant.PRIMARY}
                        >
                            {isEmailSubscriptionLoading
                                ? 'Loading...'
                                : 'Unsubscribe'}
                        </RegularButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export { Subscriptions };
