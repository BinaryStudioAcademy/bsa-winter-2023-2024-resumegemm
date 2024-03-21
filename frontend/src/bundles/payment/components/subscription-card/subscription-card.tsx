import clsx from 'clsx';

import { RegularButton } from '~/bundles/common/components/components';
import { ButtonSize, ButtonVariant } from '~/bundles/common/enums/enums';
import { useCallback } from '~/bundles/common/hooks/hooks';

import { DeletedPrices } from '../../enums/deleted-prices';
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
                    <>
                        <h3 className={styles.subscription_card__info}>
                            <span className={styles.subscription_card__price}>
                                {price.toFixed(2)}
                                {currency}
                            </span>
                        </h3>
                        <h4 className={styles.subscription_card__price_deleted}>
                            {price < DeletedPrices.MIN_AMOUNT &&
                                (
                                    price * DeletedPrices.DISCOUNT_FOR_TEST_PLAN
                                ).toFixed(2)}
                            {price > DeletedPrices.MIN_AMOUNT &&
                                (
                                    price *
                                    DeletedPrices.DISCOUNT_FOR_PREMIUM_PLAN
                                ).toFixed(2)}
                        </h4>
                    </>
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
                variant={ButtonVariant.PRIMARY}
                size={ButtonSize.MEDIUM}
            >
                SUBSCRIBE
            </RegularButton>
        </div>
    );
};

export { SubscriptionCard };
