import { RegularButton, Spinner } from '~/bundles/common/components/components';
import { SpinnerVariant } from '~/bundles/common/enums/enums';

import styles from './style.module.scss';

type Properties = {
    title: string;
    info: string;
    buttonText: string;
    isLoading?: boolean;
    onClick?: () => void;
};

const SubscriptionToggleItem: React.FC<Properties> = ({
    title,
    info,
    buttonText,
    isLoading = false,
    onClick,
}) => {
    return (
        <div className={styles.subscription__item}>
            <div className={styles.subscription__item__content}>
                <p>
                    <strong>{title}</strong>
                </p>
                <p>{info}</p>
            </div>
            <div>
                <RegularButton onClick={onClick}>
                    {isLoading ? (
                        <Spinner variant={SpinnerVariant.SMALL} />
                    ) : (
                        buttonText
                    )}
                </RegularButton>
            </div>
        </div>
    );
};

export { SubscriptionToggleItem };
