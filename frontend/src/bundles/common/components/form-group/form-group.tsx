import clsx from 'clsx';
import { type ReactNode } from 'react';
import { type FieldError } from 'react-hook-form';

import styles from './styles.module.scss';

type Properties = {
    width?: string;
    error?: FieldError;
    label?: string;
    children: ReactNode;
    className?: string;
};

const FormGroup = ({
    error,
    children,
    label = '',
    className = '',
    width = 'auto',
}: Properties): JSX.Element => {
    const errorMessage = error?.message;

    return (
        <label className={clsx(styles.label, className)} style={{ width }}>
            <span className={styles.label__name}>{label}</span>
            {children}
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </label>
    );
};

export { FormGroup };
