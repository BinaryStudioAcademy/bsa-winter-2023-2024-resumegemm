import {
    BaseButton,
    FormGroup,
    Input,
    PasswordInput,
} from '~/bundles/common/components/components';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    ButtonWidth,
} from '~/bundles/common/enums/enums';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import {
    type UserSignUpRequestDto,
    userSignUpValidationSchema,
} from '~/bundles/users/users';
import { storage, StorageKey } from '~/framework/storage/storage.js';

import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
    const { errors, handleSubmit, reset, watch, trigger } =
        useAppForm<UserSignUpRequestDto>({
            defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
            validationSchema: userSignUpValidationSchema,
            mode: 'onSubmit',
        });

    const inputReset = reset;

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            event_.preventDefault();
            void trigger();
            const email = watch('email');
            const password = watch('password');
            const repeatPassword = watch('repeatPassword');
            if (!email || !password || !repeatPassword) {
                return;
            }
            void handleSubmit(onSubmit)(event_);
            void storage.drop(StorageKey.NAME_EXIST);
            inputReset && reset();
        },
        [handleSubmit, inputReset, onSubmit, reset, trigger, watch],
    );

    return (
        <>
            <div className={styles.registration__header}>
                <h1 className={styles.registration__title}>Sign Up</h1>
                <p className={styles.registration__message}>
                    Already have an account? Go to
                    <span className={styles.registration__link}> Log in</span>
                </p>
            </div>
            <form
                className={styles.registration__form}
                onSubmit={handleFormSubmit}
            >
                <FormGroup label="First Name">
                    <Input
                        type="text"
                        placeholder="Your first name"
                        name="first name"
                    />
                </FormGroup>
                <FormGroup label="Last Name">
                    <Input
                        type="text"
                        placeholder="Your last name"
                        name="last name"
                    />
                </FormGroup>
                <FormGroup label="Email">
                    <Input type="text" placeholder="Your email" name="email" />
                </FormGroup>
                <PasswordInput
                    label="Your Password"
                    placeholder="Your password"
                    error={errors.password}
                />
                <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    error={errors.password}
                />
                <BaseButton
                    className={styles.registration__form__button}
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

export { SignUpForm };
