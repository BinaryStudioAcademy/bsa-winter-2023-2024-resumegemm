import clsx from 'clsx';
import { type ReactNode } from 'react';

import styles from './styles.module.scss';

type IconButtonProperties = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
    className?: string;
};

const IconButton: React.FC<IconButtonProperties> = ({
    onClick,
    children,
    className,
}) => (
    <button
        className={clsx(styles.icon__button, className)}
        type="button"
        onClick={onClick}
    >
        {children}
    </button>
);

export { IconButton };
