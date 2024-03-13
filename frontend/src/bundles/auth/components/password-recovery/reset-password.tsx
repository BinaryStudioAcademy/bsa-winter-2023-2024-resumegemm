import { useCallback } from 'react';
import { type UserResetPasswordRequestDto } from 'shared/build';
import { passwordValidationSchema } from 'shared/build';
import { type UserResetPassword } from 'shared/src/bundles/users/types/user-reset-password.type';

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

import { DEFAULT_PASSWORD_PAYLOAD } from './constants/constants';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: ({
        password,
    }: Pick<UserResetPasswordRequestDto, 'password'>) => Promise<void>;
};

const ResetPasswordForm: React.FC<Properties> = ({ onSubmit }) => {
    const { errors, handleSubmit, control } = useAppForm<UserResetPassword>({
        defaultValues: DEFAULT_PASSWORD_PAYLOAD,
        validationSchema: passwordValidationSchema,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    const {
        field: {
            onChange: onPasswordChange,
            value: passwordValue,
            name: passwordName,
        },
    } = useFormController({ name: 'password', control });

    const {
        field: {
            onChange: onRepeatPasswordChange,
            value: repeatPasswordValue,
            name: repeatPasswordName,
        },
    } = useFormController({ name: 'confirmPassword', control });

    return (
        <>
            <div className={styles.restore__header}>
                <h1 className={styles.restore__title}>Password restore</h1>
                <p className={styles.restore__message}>
                    Enter your new password
                </p>
            </div>
            <form onSubmit={handleFormSubmit} className={styles.restore__form}>
                <FormGroup
                    label="New password"
                    error={errors.password}
                    className={styles.restore__form_group}
                >
                    <Input
                        type="password"
                        placeholder="New password"
                        name={passwordName}
                        onChange={onPasswordChange}
                        value={passwordValue}
                    />
                </FormGroup>
                <FormGroup
                    label="Repeat New password"
                    error={errors.confirmPassword}
                    className={styles.restore__form_group}
                >
                    <Input
                        type="password"
                        placeholder="Repeat password"
                        name={repeatPasswordName}
                        value={repeatPasswordValue}
                        onChange={onRepeatPasswordChange}
                    />
                </FormGroup>
                <RegularButton
                    className={styles.restore__form__button}
                    size={ButtonSize.MEDIUM}
                    width={ButtonWidth.FULL}
                    variant={ButtonVariant.PRIMARY}
                    type={ButtonType.SUBMIT}
                >
                    Save New Password and Login
                </RegularButton>
            </form>
        </>
    );
};

export { ResetPasswordForm };
