import clsx from 'clsx';

import { BaseButton } from '~/bundles/common/components/components';
import { ButtonVariant } from '~/bundles/common/enums/enums';

import styles from './styles.module.scss';

type Properties = {
    title: string;
    currency: string;
    duration?: string;
    description: string | null;
    price: number | null;
    onClick: () => void;
    selected: boolean;
    image: string[]
};

const SubscriptionCard: React.FC<Properties> = ({
    title,
    currency,
    duration,
    description,
    price,
    onClick,
    selected,
    image
}) => {
    return <div className={clsx(styles.subscription_card__container, selected && styles.subscription_card__container_selected)}>
        {image[0] && <img src={image[0]} alt='price' />}
        
        <h2 className={styles.subscription_card__title}>{title}</h2>

        <h3 className={styles.subscription_card__info}>{price} {currency}</h3>
        {duration && <h3 className={styles.subscription_card__info}>{duration}</h3>}

        {description && <p className={styles.subscription_card__description}>{description}</p>}

        <BaseButton className={styles.subscription_card__button} onClick={onClick} variant={ButtonVariant.SQUARE_ORANGE}>
            Select
        </BaseButton>
    </div>;
};

export { SubscriptionCard };
