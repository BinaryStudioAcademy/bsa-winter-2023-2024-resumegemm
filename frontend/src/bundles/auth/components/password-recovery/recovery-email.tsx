import { useCallback } from 'react';
import { type UserForgotPasswordRequestDto } from 'shared/build';

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
import { emailValidationSchema } from '~/bundles/users/validation-schemas/email.validation-schema';

import { DEFAULT_FORGOT_PASSWORD_PAYLOAD } from './constants/default-forgot-password-payload';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: ({ email }: UserForgotPasswordRequestDto) => Promise<void>;
};

const RecoveryEmailForm: React.FC<Properties> = ({ onSubmit }) => {
    const { errors, handleSubmit, control } =
        useAppForm<UserForgotPasswordRequestDto>({
            defaultValues: DEFAULT_FORGOT_PASSWORD_PAYLOAD,
            validationSchema: emailValidationSchema,
        });

    const {
        field: { onChange, value, name },
    } = useFormController({ name: 'email', control });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    return (
        <>
            <div className={styles.restore__header}>
                <h1 className={styles.restore__title}>Password restore</h1>
                <p className={styles.restore__message}>
                    Forgot your password? Write the email address associated
                    with your account and we will send you the restoring link.
                </p>
            </div>
            <form onSubmit={handleFormSubmit} className={styles.restore__form}>
                <FormGroup label="Email" error={errors.email}>
                    <Input
                        type="email"
                        placeholder="Your email"
                        name={name}
                        value={value}
                        onChange={onChange}
                    />
                </FormGroup>
                <RegularButton
                    className={styles.restore__form__button}
                    size={ButtonSize.MEDIUM}
                    width={ButtonWidth.FULL}
                    variant={ButtonVariant.PRIMARY}
                    type={ButtonType.SUBMIT}
                >
                    Send recovery code
                </RegularButton>
            </form>
        </>
    );
};

export { RecoveryEmailForm };
