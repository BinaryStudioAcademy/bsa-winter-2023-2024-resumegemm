import { Link } from 'react-router-dom';
import { type ValueOf, userSignInValidationSchema } from 'shared/build';

import { Divider } from '~/bundles/auth/components/divider/divider';
import { SocialMediaLinks } from '~/bundles/auth/components/social-media-links/social-media-links';
import {
    FormGroup,
    Input,
    PasswordInput,
    RegularButton,
    Spinner,
} from '~/bundles/common/components/components.js';
import {
    AppRoute,
    ButtonSize,
    ButtonType,
    ButtonVariant,
    ButtonWidth,
    DataStatus,
    DividerVariant,
    SpinnerVariant,
} from '~/bundles/common/enums/enums';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { useFormFieldCreator } from '~/bundles/common/hooks/use-form-field-creator/use-form-field-creator.hook';
import { type UserSignInRequestDto } from '~/bundles/users/users';

import { DEFAULT_SIGN_IN_PAYLOAD } from './constants/constants';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (payload: UserSignInRequestDto) => void;
    dataStatus: ValueOf<typeof DataStatus>;
};

const SignInForm: React.FC<Properties> = ({ onSubmit, dataStatus }) => {
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
                    <Link to={AppRoute.SIGN_UP} className={styles.login__link}>
                        Sign Up
                    </Link>
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
                        label="Password"
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
                    {dataStatus === DataStatus.PENDING && (
                        <Spinner variant={SpinnerVariant.SMALL} />
                    )}
                    Sign up
                </RegularButton>
                <Divider variant={DividerVariant.SECONDARY} />
                <SocialMediaLinks />
            </form>
        </>
    );
};

export { SignInForm };
