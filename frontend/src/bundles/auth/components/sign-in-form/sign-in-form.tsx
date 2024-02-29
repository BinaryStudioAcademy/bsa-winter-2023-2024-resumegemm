import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { OpenAuthApiPath, userSignInValidationSchema } from 'shared/build';

import {
    FormGroup,
    Input,
    PasswordInput,
    RegularButton,
} from '~/bundles/common/components/components.js';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    ButtonWidth,
} from '~/bundles/common/enums/enums';
import { useAppForm } from '~/bundles/common/hooks/hooks';
import { useFormFieldCreator } from '~/bundles/common/hooks/use-form-field-creator/use-form-field-creator.hook';
import { type UserSignInRequestDto } from '~/bundles/users/users';
import { config } from '~/framework/config/config.js';

import { DEFAULT_SIGN_IN_PAYLOAD } from './constants/constants';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (paload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
        defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
        validationSchema: userSignInValidationSchema,
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
                    <Input
                        type="text"
                        placeholder="Your email"
                        {...useFormFieldCreator({ name: 'email', control })}
                    />
                </FormGroup>
                <div className={styles.login__form_password}>
                    <span className={styles.forgot__link}>
                        Forgot Password?
                    </span>
                    <PasswordInput
                        label="Passwod"
                        error={errors.password}
                        placeholder="Your password"
                        {...useFormFieldCreator({ name: 'password', control })}
                    />
                </div>
                <RegularButton
                    className={styles.login__form__button}
                    size={ButtonSize.MEDIUM}
                    width={ButtonWidth.FULL}
                    variant={ButtonVariant.PRIMARY}
                    type={ButtonType.SUBMIT}
                >
                    Sign up
                </RegularButton>
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
