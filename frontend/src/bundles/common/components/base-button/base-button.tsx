import clsx from 'clsx';
import { type ReactNode } from 'react';

import { type ButtonType } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

import styles from './styles.module.scss';

type BaseButtonProperties = {
    children?: ReactNode;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    type?: ValueOf<typeof ButtonType>;
};

const BaseButton: React.FC<BaseButtonProperties> = ({
    children,
    disabled,
    onClick,
    className,
    type,
    ...restProperties
}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={clsx(styles.button__base, className)}
            type={type}
            {...restProperties}
        >
            {children}
        </button>
    );
};

export { BaseButton };
