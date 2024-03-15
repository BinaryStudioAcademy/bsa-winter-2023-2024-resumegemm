import clsx from 'clsx';

import { RegularButton } from '~/bundles/common/components/components';
import { ButtonSize, ButtonVariant } from '~/bundles/common/enums/enums';
import { useCallback } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

type Properties = {
    title: string;
    currency: string;
    duration?: string;
    description: string | null;
    price: number | null;
    onClick: (priceId: string) => void;
    selected: boolean;
    image: string[];
    priceId: string;
};

const SubscriptionCard: React.FC<Properties> = ({
    title,
    currency,
    duration,
    description,
    price,
    onClick,
    selected,
    image,
    priceId,
}) => {
    const handleSelectPrice = useCallback(() => {
        onClick(priceId);
    }, [onClick, priceId]);

    return (
        <div
            className={clsx(
                styles.subscription_card__container,
                selected && styles.subscription_card__container_selected,
            )}
        >
            <div className={styles.subscription_card__title_container}>
                {image[0] && (
                    <img
                        className={styles.subscription_card__title_image}
                        src={image[0]}
                        alt="price"
                    />
                )}
                <h2 className={styles.subscription_card__title}>{title}</h2>
            </div>

            <div className={styles.subscription_card__info_container}>
                {price && (
                    <h3 className={styles.subscription_card__info}>
                        <span className={styles.subscription_card__price}>
                            {price.toFixed(2)}
                        </span>{' '}
                        <span className={styles.subscription_card__currency}>
                            {currency}
                        </span>
                    </h3>
                )}
                {duration && (
                    <h3 className={styles.subscription_card__duration}>
                        {duration}
                    </h3>
                )}
            </div>

            {description && (
                <p className={styles.subscription_card__description}>
                    {description}
                </p>
            )}

            <RegularButton
                className={styles.subscription_card__button}
                onClick={handleSelectPrice}
                variant={ButtonVariant.SQUARE_ORANGE}
                size={ButtonSize.MEDIUM}
            >
                Select
            </RegularButton>
        </div>
    );
};

export { SubscriptionCard };
