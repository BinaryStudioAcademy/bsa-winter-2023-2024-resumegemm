import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Divider } from '~/bundles/auth/components/divider/divider';
import { SocialMediaLinks } from '~/bundles/auth/components/social-media-links/social-media-links';
import {
    FormGroup,
    Input,
    PasswordInput,
    RegularButton,
} from '~/bundles/common/components/components';
import {
    AppRoute,
    ButtonSize,
    ButtonType,
    ButtonVariant,
    ButtonWidth,
    DividerVariant,
} from '~/bundles/common/enums/enums';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { useFormFieldCreator } from '~/bundles/common/hooks/use-form-field-creator/use-form-field-creator.hook';
import { ToastContext } from '~/bundles/toast/context/toast-context';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum';

import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants';
import { UserRegistrationMessage } from './enums/user-registration-message.enum';
import styles from './styles.module.scss';
import {
    type UserSignUpRequestDtoFrontend,
    userSignUpValidationFrontend,
} from './validation/sign-up-validation';

type Properties = {
    onSubmit: (payload: UserSignUpRequestDtoFrontend) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
    const { showToast } = useContext(ToastContext);

    const { control, errors, handleSubmit } =
        useAppForm<UserSignUpRequestDtoFrontend>({
            defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
            validationSchema: userSignUpValidationFrontend,
        });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
            showToast(UserRegistrationMessage.CONFIRM_EMAIL, ToastType.SUCCESS);
        },
        [handleSubmit, onSubmit, showToast],
    );

    return (
        <>
            <div className={styles.registration__header}>
                <h1 className={styles.registration__title}>Sign Up</h1>
                <p className={styles.registration__message}>
                    Already have an account? Go to
                    <Link
                        to={AppRoute.LOG_IN}
                        className={styles.registration__link}
                    >
                        Log in
                    </Link>
                </p>
            </div>
            <form
                className={styles.registration__form}
                onSubmit={handleFormSubmit}
            >
                <FormGroup
                    className={styles.form_group}
                    error={errors.firstName}
                    label="First Name"
                >
                    <Input
                        type="text"
                        placeholder="Your first name"
                        {...useFormFieldCreator({ name: 'firstName', control })}
                    />
                </FormGroup>
                <FormGroup
                    className={styles.form_group}
                    error={errors.lastName}
                    label="Last Name"
                >
                    <Input
                        type="text"
                        placeholder="Your last name"
                        {...useFormFieldCreator({ name: 'lastName', control })}
                    />
                </FormGroup>
                <FormGroup
                    className={styles.form_group}
                    error={errors.email}
                    label="Email"
                >
                    <Input
                        type="text"
                        placeholder="Your email"
                        {...useFormFieldCreator({ name: 'email', control })}
                    />
                </FormGroup>
                <PasswordInput
                    label="Your Password"
                    placeholder="Your password"
                    error={errors.password}
                    {...useFormFieldCreator({ name: 'password', control })}
                />
                <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    error={errors.confirmPassword}
                    {...useFormFieldCreator({
                        name: 'confirmPassword',
                        control,
                    })}
                />
                <RegularButton
                    className={styles.registration__form__button}
                    size={ButtonSize.MEDIUM}
                    width={ButtonWidth.FULL}
                    variant={ButtonVariant.PRIMARY}
                    type={ButtonType.SUBMIT}
                >
                    Sign up
                </RegularButton>
                <Divider variant={DividerVariant.PRIMARY} />
                <SocialMediaLinks />
            </form>
        </>
    );
};

export { SignUpForm };
