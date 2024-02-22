import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { type ChangeEvent,type FormEvent,useEffect  } from 'react';
import { useCallback,useState } from 'react';

import { Input } from '~/bundles/common/components/components';
import { useAppDispatch, useAppSelector } from '~/bundles/common/hooks/hooks';

import { createSubscription, getPrices } from '../store/actions';
import { type CreateSubscriptionResponseDto } from '../types/types';
import styles from './styles.module.scss';

const SubscriptionPaymentPage: React.FC = () => {
    const elements = useElements();
    const stripe = useStripe();
    const dispatch = useAppDispatch();

    const { prices } = useAppSelector(({ payment }) => ({
        prices: payment.prices
    }));

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [priceId, setPriceId] = useState('');

    const handleNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }, []);

    const handleEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }, []);

    const handlePriceChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPriceId(event.currentTarget.value);
    }, []);

    const HandleSubmit = useCallback((event: FormEvent<HTMLFormElement>): void => {
        async function HandleSubmitAsync(): Promise<void> {
            event.preventDefault();

            if (!stripe || !elements) {
                return;
            }
            
            const paymentMethod = await stripe.createPaymentMethod({
                elements,
                params: {
                    type: 'card',
                    billing_details: {
                        name,
                        email,
                    }
                }
            });

            if (!paymentMethod.paymentMethod) {
                return;
            }
        
            const { payload } = await dispatch(createSubscription({
                name, 
                email,
                priceId,
                paymentMethod: paymentMethod.paymentMethod.id
            })) as { payload: CreateSubscriptionResponseDto };

            if (!payload.clientSecret) {
                return;
            }

            const confirmPayment = await stripe.confirmCardPayment(
                payload.clientSecret
            );

            if (confirmPayment.error) {
                alert(confirmPayment.error.message);
            }
            else {
                alert('Success! Check your email for the invoice.');
            }
        }

        void HandleSubmitAsync();
    }, [elements, stripe, dispatch, name, email, priceId]);

    useEffect(() => {
        void dispatch(getPrices({}));
    }, [dispatch]);

    return <div className={styles.payment__container}>
        <form className={styles.payment__form} onSubmit={HandleSubmit}>
            { prices.map((price) => <div key={price.id}>{price.unit_amount} {price.currency} {price.recurring?.interval} {price.product.name}</div>) }
            <Input placeholder='Name' onChange={handleNameChange} />
            <Input placeholder='email' onChange={handleEmailChange} />
            <CardElement />
            <input type='submit' />
        </form>
    </div>;
};

export { SubscriptionPaymentPage };
