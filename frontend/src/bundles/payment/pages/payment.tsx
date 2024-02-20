import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { type FormEvent, useCallback } from 'react';

import { useAppDispatch } from '~/bundles/common/hooks/hooks';

import { actions as PaymentActions } from '../store/';
import { type CreatePaymentIntentResponseDto } from '../types/types';

const PaymentPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const elements = useElements();
    const stripe = useStripe();

    const HandleSubmit = useCallback((event: FormEvent<HTMLFormElement>): void => {
        async function HandleSubmitAsync(): Promise<void> {
            event.preventDefault();

            if (!stripe || !elements) {
                return;
            }
    
            const cardElement = elements.getElement(CardElement);
    
            const { payload } = (await dispatch(PaymentActions.createPaymentIntent({ amount: 100, currency: 'usd' }))) as { payload: CreatePaymentIntentResponseDto };

            if (!payload.clientSecret || !cardElement) {
                return;
            }

            const { error, paymentIntent } = await stripe.confirmCardPayment(payload.clientSecret, {
                payment_method: {
                    card: cardElement
                }
            });

            if (error) {
                return;
            }
        }

        void HandleSubmitAsync();
    }, [dispatch, elements, stripe]);

    return <div>
        <form onSubmit={HandleSubmit}>
            <CardElement />
            <input type='submit' />
        </form>
    </div>;
};

export { PaymentPage };
