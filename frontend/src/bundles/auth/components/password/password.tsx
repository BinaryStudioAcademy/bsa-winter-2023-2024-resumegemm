import { type FieldError } from 'react-hook-form';

import {
    FormGroup,
    Icon,
    IconButton,
    Input,
} from '~/bundles/common/components/components';
import { IconName, IconSize } from '~/bundles/common/enums/enums';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

// TODO: replace types with right
type PasswordProperties = {
    error: FieldError | undefined;
    isConfirmPasswordShown?: boolean;
};

const Password: React.FC<PasswordProperties> = ({
    error,
    isConfirmPasswordShown = false,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
        useState(false);

    const togglePasswordVisibility = useCallback((): void => {
        setIsPasswordVisible(!isPasswordVisible);
    }, [isPasswordVisible]);

    const togglePasswordConfirmVisibility = useCallback((): void => {
        setIsPasswordConfirmVisible(!isPasswordConfirmVisible);
    }, [isPasswordConfirmVisible]);

    return (
        <>
            <div className={styles.password}>
                <FormGroup label="Password" error={error} width="100%">
                    <Input
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder="Enter your password"
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
            </div>
            {isConfirmPasswordShown && (
                <div className={styles.password}>
                    <FormGroup
                        label="Confirm Password"
                        error={error}
                        width="100%"
                    >
                        <Input
                            type={
                                isPasswordConfirmVisible ? 'text' : 'password'
                            }
                            placeholder="Confirm your password"
                            name="password"
                        />
                        <IconButton
                            className={styles.password__icon}
                            onClick={togglePasswordConfirmVisibility}
                        >
                            <Icon
                                size={IconSize.SMALL}
                                name={
                                    isPasswordConfirmVisible
                                        ? IconName.EYE_OPEN
                                        : IconName.EYE_SLASH
                                }
                            />
                        </IconButton>
                    </FormGroup>
                </div>
            )}
        </>
    );
};

export { Password };
