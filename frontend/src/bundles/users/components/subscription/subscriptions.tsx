import { Modal, RegularButton } from '~/bundles/common/components/components';
import { ButtonVariant, ModalVariant } from '~/bundles/common/enums/enums';
import { useEmailSubscriptions } from '~/bundles/common/hooks/hooks';

import styles from './style.module.scss';
import { SubscriptionItem } from './subscription-item';
import { SubscriptionToggleItem } from './subscription-toggle-item';

const Subscriptions: React.FC = () => {
    const {
        handleUnsubscribe,
        isEmailSubscriptionLoading,
        toggleItemProperties,
        handleModalClose,
        isModalOpen,
    } = useEmailSubscriptions();

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
                            onClick={handleUnsubscribe}
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
