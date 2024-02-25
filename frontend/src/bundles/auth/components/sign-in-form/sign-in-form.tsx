import { useCallback, useState } from 'react';
import { userSignInValidationSchema } from 'shared/build';

import {
    BaseButton,
    FormGroup,
    Icon,
    IconButton,
} from '~/bundles/common/components/components.js';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    ButtonWidth,
    IconName,
    IconSize,
} from '~/bundles/common/enums/enums';
import { useAppForm } from '~/bundles/common/hooks/hooks';
import { type UserSignInRequestDto } from '~/bundles/users/users';

import { Input } from '../sign-up-form/components/sign-up-form-input';
import { DEFAULT_SIGN_IN_PAYLOAD } from '../sign-up-form/constants/constants';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (event: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = useCallback((): void => {
        setIsPasswordVisible(!isPasswordVisible);
    }, [isPasswordVisible]);
    // TODO: replace type, payload and validation for sign-in
    const { control, errors, handleSubmit, watch, trigger } =
        useAppForm<UserSignInRequestDto>({
            defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
            validationSchema: userSignInValidationSchema,
        });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            event_.preventDefault();
            void trigger();
            const email = watch('email');
            const password = watch('password');
            if (!email || !password) {
                return;
            }
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit, trigger, watch],
    );

    return (
        <>
            <div className={styles.login__header}>
                <h1 className={styles.login__title}>Log In</h1>
                <p className={styles.login__message}>
                    No account? Go to
                    <span className={styles.login__link}> Sign Up</span>
                </p>
            </div>
            <form onSubmit={handleFormSubmit} className={styles.login__form}>
                <FormGroup label="Email">
                    <Input
                        control={control}
                        errors={errors}
                        type="email"
                        placeholder="Your email"
                        name="email"
                    />
                </FormGroup>
                <FormGroup label="Password">
                    <Input
                        control={control}
                        errors={errors}
                        type="text"
                        placeholder="Your password"
                        name="password"
                    />
                    <IconButton
                        className={styles.password__icon}
                        onClick={togglePasswordVisibility}
                    >
                        <Icon
                            size={IconSize.SMALL}
                            name={
                                isPasswordVisible
                                    ? IconName.EYE_OPEN
                                    : IconName.EYE_SLASH
                            }
                        />
                    </IconButton>
                </FormGroup>
                <BaseButton
                    className={styles.login__form__button}
                    size={ButtonSize.MEDIUM}
                    width={ButtonWidth.FULL}
                    variant={ButtonVariant.PRIMARY}
                    type={ButtonType.SUBMIT}
                >
                    Sign up
                </BaseButton>
            </form>
        </>
    );
};

export { SignInForm };
