import { CardElement } from '@stripe/react-stripe-js';
import { type ChangeEvent, type FormEvent } from 'react';

import {
    FormGroup,
    Icon,
    Input,
    RegularButton,
} from '~/bundles/common/components/components';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    ButtonWidth,
    IconName,
    IconSize,
} from '~/bundles/common/enums/enums';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

import { PaymentInfo } from '../../components/payment-info/payment-info';
import { COINS_IN_BANKNOTE } from '../../constants/payment.constant';
import { type GetPriceResponseDto } from '../../types/types';
import styles from './styles.module.scss';

type SubscriptionPaymentPageProperties = {
    onChangeEmail: (event: ChangeEvent<HTMLInputElement>) => void;
    onChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
    onPaymentSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
    onChangeActiveStep: () => void;
    price: GetPriceResponseDto | undefined;
    processing: boolean;
};
const SubscriptionPaymentPage: React.FC<SubscriptionPaymentPageProperties> = ({
    onPaymentSubmit,
    onChangeEmail,
    onChangeName,
    price,
    processing,
}) => {
    const priceUnitAmount = price?.unit_amount ?? 0;
    const priceAmount = priceUnitAmount / COINS_IN_BANKNOTE;

    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            void onPaymentSubmit(event);
        },
        [onPaymentSubmit],
    );

    return (
        <div className={styles.payment__container}>
            <PaymentInfo />
            <div className={styles.payment_form__container}>
                <form
                    className={styles.payment__form_container}
                    onSubmit={handleSubmit}
                >
                    <div className={styles.payment__form_header}>
                        <div className={styles.payment__form_total}>
                            Total Due Today:
                        </div>
                        <div className={styles.payment__form_price}>
                            {priceAmount} {price?.currency}
                        </div>
                    </div>
                    <div className={styles.payment__form_content}>
                        <div className={styles.payment__form_payment_method}>
                            <Icon
                                name={IconName.CREDIT_CARD}
                                size={IconSize.LARGE}
                            />
                            <p> Credit Card </p>
                        </div>
                        <FormGroup label="Name">
                            <Input
                                width="100%"
                                placeholder="Name"
                                onChange={onChangeName}
                            />
                        </FormGroup>
                        <FormGroup label="Email">
                            <Input
                                width="100%"
                                placeholder="email"
                                onChange={onChangeEmail}
                            />
                        </FormGroup>
                        <FormGroup label="Card Details">
                            <CardElement
                                className={styles.payment_input_card}
                            />
                        </FormGroup>

                        <RegularButton
                            className={styles.payment__confirm_button}
                            type={ButtonType.SUBMIT}
                            width={ButtonWidth.FULL}
                            isDisabled={processing}
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.MEDIUM}
                        >
                            Confirm Payment
                        </RegularButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { SubscriptionPaymentPage };
