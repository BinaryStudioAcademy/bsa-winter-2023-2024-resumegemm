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
    hint?: ReactNode;
};

const FormGroup = ({
    error,
    children,
    label = '',
    className = '',
    width = 'auto',
    hint,
}: Properties): JSX.Element => {
    const errorMessage = error?.message;

    return (
        <label className={clsx(styles.label, className)} style={{ width }}>
            <div className={styles.label__container}>
                <span className={styles.label__name}>{label}</span>
                {hint && <span className={styles.label__hint}>{hint}</span>}
            </div>
            {children}
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </label>
    );
};

export { FormGroup };
