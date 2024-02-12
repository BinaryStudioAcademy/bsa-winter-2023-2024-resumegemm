import clsx from 'clsx';

import {
    type ButtonTheme,
    ButtonSize,
    IconName,
    IconSize,
} from '~/bundles/common/enums/enums';
import { type ButtonType, type ValueOf } from '~/bundles/common/types/types';

import { Icon } from '../icon/icon';
import styles from './styles.module.scss';

type ButtonProperties = {
    label?: string;
    type?: ButtonType;
    theme?: ValueOf<typeof ButtonTheme>;
    size?: ValueOf<typeof ButtonSize>;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isDisabled?: boolean;
    className?: string;
    isRightIcon?: boolean;
    isLeftIcon?: boolean;
};

const Button: React.FC<ButtonProperties> = ({
    label,
    onClick,
    type = 'button',
    theme,
    size = ButtonSize.MEDIUM,
    isDisabled = false,
    className,
    isRightIcon,
    isLeftIcon,
}) => {
    return (
        <button
            disabled={isDisabled}
            onClick={onClick}
            className={clsx(
                styles.btn,
                styles[`btn__${size}`],
                theme && styles[`theme-${theme}`],
                // styles.disabled,
                className,
            )}
            type={type}
        >
            {isLeftIcon && (
                <Icon
                    name={IconName.PLUS}
                    size={
                        size === ButtonSize.MEDIUM
                            ? IconSize.LARGE
                            : IconSize.MEDIUM
                    }
                />
            )}
            {label}
            {isRightIcon && (
                <Icon
                    name={IconName.CHEVRON_DOWN}
                    size={
                        size === ButtonSize.MEDIUM
                            ? IconSize.LARGE
                            : IconSize.MEDIUM
                    }
                />
            )}
        </button>
    );
};

export { Button };
