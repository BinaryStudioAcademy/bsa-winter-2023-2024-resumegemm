import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { type UserVerifyResetPasswordTokenRequestDto } from 'shared/build';
import { recoveryCodeValidationSchema } from 'shared/build';

import {
    FormGroup,
    Input,
    RegularButton,
} from '~/bundles/common/components/components.js';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    ButtonWidth,
} from '~/bundles/common/enums/enums';
import { useAppForm, useFormController } from '~/bundles/common/hooks/hooks';

import { DEFAULT_RESET_PASSWORD_TOKEN_PAYLOAD } from './constants/constants';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: ({
        resetPasswordToken,
    }: UserVerifyResetPasswordTokenRequestDto) => Promise<void>;
    onResendCode: () => void;
};

const RecoveryCodeForm: React.FC<Properties> = ({ onSubmit, onResendCode }) => {
    const navigate = useNavigate();

    const { errors, handleSubmit, control } =
        useAppForm<UserVerifyResetPasswordTokenRequestDto>({
            defaultValues: DEFAULT_RESET_PASSWORD_TOKEN_PAYLOAD,
            validationSchema: recoveryCodeValidationSchema,
        });

    const {
        field: { onChange, value, name },
    } = useFormController({ name: 'resetPasswordToken', control });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    const handleButtonBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <>
            <div className={styles.restore__header}>
                <h1 className={styles.restore__title}>Password restore</h1>
                <p className={styles.restore__message}>Enter your code</p>
            </div>
            <form onSubmit={handleFormSubmit} className={styles.restore__form}>
                <FormGroup
                    label="Recovery code"
                    error={errors.resetPasswordToken}
                >
                    <Input
                        type="text"
                        placeholder="Your recovery code"
                        name={name}
                        onChange={onChange}
                        value={value}
                    />
                </FormGroup>
                <div className={styles.restore__form__actions}>
                    <RegularButton
                        size={ButtonSize.SMALL}
                        width={ButtonWidth.FULL}
                        variant={ButtonVariant.OUTLINED}
                        onClick={handleButtonBack}
                    >
                        Back
                    </RegularButton>
                    <RegularButton
                        size={ButtonSize.SMALL}
                        width={ButtonWidth.FULL}
                        variant={ButtonVariant.OUTLINED}
                        onClick={onResendCode}
                    >
                        Send new code
                    </RegularButton>
                    <RegularButton
                        className={styles.restore__form__button}
                        size={ButtonSize.SMALL}
                        width={ButtonWidth.FULL}
                        variant={ButtonVariant.PRIMARY}
                        type={ButtonType.SUBMIT}
                    >
                        Reset Password
                    </RegularButton>
                </div>
            </form>
        </>
    );
};

export { RecoveryCodeForm };
