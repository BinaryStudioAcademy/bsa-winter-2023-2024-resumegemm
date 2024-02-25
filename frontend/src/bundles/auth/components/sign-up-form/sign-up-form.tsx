import {
    BaseButton,
    FormGroup,
    Icon,
    IconButton,
} from '~/bundles/common/components/components';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    ButtonWidth,
    IconName,
    IconSize,
} from '~/bundles/common/enums/enums';
import {
    useAppForm,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks';
import {
    type UserSignUpRequestDto,
    userSignUpValidationSchema,
} from '~/bundles/users/users';
import { storage, StorageKey } from '~/framework/storage/storage.js';

import { Input } from './components/sign-up-form-input';
import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = useCallback((): void => {
        setIsPasswordVisible(!isPasswordVisible);
    }, [isPasswordVisible]);

    const { control, errors, handleSubmit, reset, watch, trigger } =
        useAppForm<UserSignUpRequestDto>({
            defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
            validationSchema: userSignUpValidationSchema,
            mode: 'onBlur',
        });

    const inputReset = reset;

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            event_.preventDefault();
            void trigger();
            const firstName = watch('firstName');
            const lastName = watch('lastName');
            const email = watch('email');
            const password = watch('password');
            const repeatPassword = watch('repeatPassword');
            if (
                !firstName ||
                !lastName ||
                !email ||
                !password ||
                !repeatPassword
            ) {
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
                <FormGroup label="First Name" width="100%">
                    <Input
                        control={control}
                        errors={errors}
                        type="text"
                        placeholder="Your first name"
                        name="firstName"
                    />
                </FormGroup>
                <FormGroup label="Last Name">
                    <Input
                        control={control}
                        errors={errors}
                        type="text"
                        placeholder="Your last name"
                        name="lastName"
                    />
                </FormGroup>
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
                <FormGroup label="Repeat password">
                    <Input
                        control={control}
                        errors={errors}
                        type="text"
                        placeholder="Confirm your password"
                        name="repeatPassword"
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
