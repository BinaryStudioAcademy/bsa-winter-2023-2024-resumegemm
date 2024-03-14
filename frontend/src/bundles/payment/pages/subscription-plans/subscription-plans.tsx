import { useCallback } from 'react';

import { SubscriptionCard } from '../../components/subscription-card';
import { COINS_IN_BANKNOTE } from '../../constants/payment.constant';
import { type GetPriceResponseDto } from '../../types/types';
import styles from './styles.module.scss';

type SubscriptionPlansProperties = {
    priceId: string;
    prices: GetPriceResponseDto[];
    onSelectPrice: () => void;
};
const SubscriptionPlans: React.FC<SubscriptionPlansProperties> = ({
    priceId,
    prices,
    onSelectPrice,
}) => {
    const handleSelectPrice = useCallback(() => {
        onSelectPrice();
    }, [onSelectPrice]);

    return (
        <div className={styles.payment__container}>
            <div className={styles.payment__prices_container}>
                {prices.map((price) => (
                    <SubscriptionCard
                        image={price.product.images}
                        onClick={handleSelectPrice}
                        key={price.id}
                        price={
                            price.unit_amount &&
                            price.unit_amount / COINS_IN_BANKNOTE
                        }
                        currency={price.currency}
                        duration={`${price.recurring.interval_count} ${price.recurring.interval}`}
                        title={price.product.name}
                        description={price.product.description}
                        selected={priceId === price.id}
                    />
                ))}
            </div>
        </div>
    );
};

export { SubscriptionPlans };
