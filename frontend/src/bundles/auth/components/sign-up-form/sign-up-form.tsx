import { Divider } from '~/bundles/auth/components/divider/divider';
import { SocialMediaLinks } from '~/bundles/auth/components/social-media-links/social-media-links';
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

import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
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
                <Divider isBlue />
                <SocialMediaLinks />
            </form>
        </>
    );
};

export { SignUpForm };
