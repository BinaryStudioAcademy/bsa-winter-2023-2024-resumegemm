import { useNavigate } from 'react-router-dom';

import { Icon, RegularButton } from '~/bundles/common/components/components.js';
import {
    AppRoute,
    ButtonSize,
    ButtonVariant,
    IconName,
} from '~/bundles/common/enums/enums';
import { useCallback } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

const SubscriptionCancelResult: React.FC = () => {
    const navigate = useNavigate();

    const handleClose = useCallback(() => {
        navigate(AppRoute.HOME);
    }, [navigate]);

    return (
        <div className={styles.subscription_cancelled_container}>
            <Icon
                name={IconName.CHAIN_BROKEN}
                className={styles.subscription_cancelled__icon}
            />
            <div className={styles.subscription_cancelled__content}>
                <div className={styles.subscription_cancelled__title}>
                    Your subscription is cancelled
                </div>
                <div className={styles.subscription_cancelled__text}>
                    Thanks for your business. Your premium subscription is
                    cancelled. You will receive an email confirmation and are
                    downgraded to the free plan.
                </div>
            </div>
            <RegularButton
                className={styles.subscription_cancelled__button}
                onClick={handleClose}
                variant={ButtonVariant.PRIMARY}
                size={ButtonSize.MEDIUM}
            >
                Back To Dashboard
            </RegularButton>
        </div>
    );
};

export { SubscriptionCancelResult };
