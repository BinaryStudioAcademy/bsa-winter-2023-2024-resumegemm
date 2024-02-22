import clsx from 'clsx';
import { type InputHTMLAttributes, type ReactNode } from 'react';

import styles from './styles.module.scss';

interface Properties extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    width?: string;
    children?: ReactNode;
}

const IconInput = ({
    children,
    className = '',
    width = '200px',
    ...otherProperties
}: Properties): JSX.Element => {
    const { onChange } = otherProperties;

    return (
        <label className={styles.input__wrapper} style={{ width }}>
            {children}
            <input
                className={clsx(styles.icon_input, className)}
                {...otherProperties}
                onChange={onChange}
            />
        </label>
    );
};

export { IconInput };
