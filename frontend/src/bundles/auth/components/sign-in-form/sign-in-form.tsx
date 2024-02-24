import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { OpenAuthApiPath } from 'shared/build/index.js';

import {
    BaseButton,
    FormGroup,
    Input,
    PasswordInput,
} from '~/bundles/common/components/components.js';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    ButtonWidth,
} from '~/bundles/common/enums/enums';
import { useAppForm } from '~/bundles/common/hooks/hooks';
import {
    type UserSignUpRequestDto,
    userSignUpValidationSchema,
} from '~/bundles/users/users';
import { config } from '~/framework/config/config.js';

import { DEFAULT_SIGN_UP_PAYLOAD } from '../sign-up-form/constants/constants';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: () => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
    // TODO: replace type, payload and validation for sign-in
    const { errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
        defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
        validationSchema: userSignUpValidationSchema,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
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
                <FormGroup label="Email" error={errors.email}>
                    <Input type="email" placeholder="Your email" name="email" />
                </FormGroup>
                <div className={styles.login__form_password}>
                    <span className={styles.forgot__link}>
                        Forgot Password?
                    </span>
                    <PasswordInput
                        label="Your password"
                        error={errors.password}
                        placeholder="Your password"
                    />
                </div>
                <BaseButton
                    className={styles.login__form__button}
                    size={ButtonSize.MEDIUM}
                    width={ButtonWidth.FULL}
                    variant={ButtonVariant.PRIMARY}
                    type={ButtonType.SUBMIT}
                >
                    Sign up
                </BaseButton>
                <NavLink
                    to={`${config.ENV.API.PROXY_URL}${OpenAuthApiPath.GITHUB}`}
                >
                    Login Github
                </NavLink>
            </form>
        </>
    );
};

export { SignInForm };
