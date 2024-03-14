import { CardElement } from '@stripe/react-stripe-js';
import { type ChangeEvent, type FormEvent } from 'react';

import {
    FormGroup,
    Icon,
    Input,
    RegularButton,
} from '~/bundles/common/components/components';
import { ButtonWidth } from '~/bundles/common/enums/components/button-width.enum';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    IconName,
    IconSize,
} from '~/bundles/common/enums/enums';

import { type GetPriceResponseDto } from '../../types/types';
import styles from './styles.module.scss';

type SubscriptionPaymentPageProperties = {
    onChangeEmail: (event: ChangeEvent<HTMLInputElement>) => void;
    onChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
    onPaymentSubmit: (event: FormEvent<HTMLFormElement>) => void;
    price: GetPriceResponseDto | undefined;
    processing: boolean;
};
const SubscriptionPaymentPage: React.FC<SubscriptionPaymentPageProperties> = ({
    onPaymentSubmit,
    onChangeEmail,
    onChangeName,
    processing,
}) => {
    return (
        <div className={styles.payment__container}>
            <form
                className={styles.payment__form_container}
                onSubmit={onPaymentSubmit}
            >
                <div className={styles.payment__form_total}>
                    <div>Total Due Today:</div>
                    <div className={styles.payment__form_price}></div>
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
                        <CardElement className={styles.payment_input_card} />
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
    );
};

export { SubscriptionPaymentPage };
