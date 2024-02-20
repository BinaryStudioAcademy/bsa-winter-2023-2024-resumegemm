import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { type FormEvent, useCallback } from 'react';

import styles from './styles.module.scss';

const PaymentPage: React.FC = () => {
    const elements = useElements();
    const stripe = useStripe();

    const HandleSubmit = useCallback((event: FormEvent<HTMLFormElement>): void => {
        async function HandleSubmitAsync(): Promise<void> {
            event.preventDefault();

            if (!stripe || !elements) {
                return;
            }

            await stripe.confirmPayment({
                elements, 
                confirmParams: {
                    return_url: `${window.location.origin}/213`
                },
                redirect: 'if_required'
            });
        }

        void HandleSubmitAsync();
    }, [elements, stripe]);

    return <div className={styles.payment__container}>
        <form className={styles.payment__form} onSubmit={HandleSubmit}>
            <PaymentElement/>
            <input type='submit' />
        </form>
    </div>;
};

export { PaymentPage };
