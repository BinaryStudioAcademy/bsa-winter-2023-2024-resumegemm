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
import { useFormFieldCreator } from '~/bundles/common/hooks/use-form-field-creator/use-form-field-creator.hook';
import { type UserSignUpRequestDto } from '~/bundles/users/users';

import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants';
import styles from './styles.module.scss';
import { type UserSignUpRequestDtoFrontend } from './validation/sign-up-validation';
import { userSignUpValidationFrontend } from './validation/sign-up-validation';

type Properties = {
    onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } =
        useAppForm<UserSignUpRequestDtoFrontend>({
            defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
            validationSchema: userSignUpValidationFrontend,
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
                <FormGroup error={errors.firstName} label="First Name">
                    <Input
                        type="text"
                        placeholder="Your first name"
                        {...useFormFieldCreator({ name: 'firstName', control })}
                    />
                </FormGroup>
                <FormGroup error={errors.lastName} label="Last Name">
                    <Input
                        type="text"
                        placeholder="Your last name"
                        {...useFormFieldCreator({ name: 'lastName', control })}
                    />
                </FormGroup>
                <FormGroup error={errors.email} label="Email">
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
                    error={errors.confirm_password}
                    {...useFormFieldCreator({
                        name: 'confirm_password',
                        control,
                    })}
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
