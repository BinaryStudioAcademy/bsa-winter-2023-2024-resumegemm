import { type Control, type FieldErrors } from 'react-hook-form';

import { Icon, IconButton, Input } from '~/bundles/common/components/components';
import { IconName, IconSize } from '~/bundles/common/enums/enums';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { type UserSignUpRequestDto } from '~/bundles/users/users';

import styles from './styles.module.scss';

// TODO: replace types with right
type PasswordProperties = {
    control: Control<UserSignUpRequestDto, null>, 
    errors: FieldErrors<UserSignUpRequestDto>,
    isConfirmPasswordShown?: boolean
};

const Password: React.FC<PasswordProperties> = (
    { control, errors, isConfirmPasswordShown = false }) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
        useState(false);

    const togglePasswordVisibility = useCallback(():void => {
        setIsPasswordVisible(!isPasswordVisible);
    }, [isPasswordVisible]);
    
    const togglePasswordConfirmVisibility = useCallback(():void => {
        setIsPasswordConfirmVisible(!isPasswordConfirmVisible);
    }, [isPasswordConfirmVisible]);
    
    return (
        <>
            <div className={styles.password}>
                <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    label="Password"
                    placeholder="Enter your password"
                    name="password"
                    control={control}
                    errors={errors}
                    className={styles.password__input}
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
            </div>
            { isConfirmPasswordShown &&
            <div className={styles.password}>
                <Input
                    type={isPasswordConfirmVisible ? 'text' : 'password'}
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    name="password"
                    control={control}
                    errors={errors}
                    className={styles.password__input}
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
            </div>}    
        </>
    );
};

export { Password };
