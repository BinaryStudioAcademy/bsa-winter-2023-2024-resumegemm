import { Button, Input } from '~/bundles/common/components/components';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant
} from '~/bundles/common/enums/enums';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import {
    type UserSignUpRequestDto,
    userSignUpValidationSchema,
} from '~/bundles/users/users';

import { Password } from '../password/password';
import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {

    const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
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
                    <span className={styles.registration__link}>
                        {' '}
                        Log in
                    </span>
                </p>
            </div>
            <form
                className={styles.registration__form}
                onSubmit={handleFormSubmit}
            >
                {/* TODO: replace input with merged one */}
                <Input
                    type="text"
                    label="Name"
                    placeholder="Enter your name"
                    name="name"
                    control={control}
                    errors={errors}
                />
                <Input
                    type="text"
                    label="Email"
                    placeholder="Enter your email"
                    name="email"
                    control={control}
                    errors={errors}
                />
                <Password control={control} errors={errors} isConfirmPasswordShown={true} />
                <Button
                    size={ButtonSize.MEDIUM}
                    isFluid={true}
                    variant={ButtonVariant.PRIMARY}
                    type={ButtonType.SUBMIT}
                >
                    Sign up
                </Button>
            </form>
        </>
    );
};

export { SignUpForm };
