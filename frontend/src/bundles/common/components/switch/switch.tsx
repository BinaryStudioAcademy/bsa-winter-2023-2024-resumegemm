import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';

import styles from './styles.module.scss';

type Properties = {
    label: string;
    checked?: boolean;
    className?: string;
    onChange?: (state: boolean) => void;
};

const Switch: React.FC<Properties> = ({
    label,
    checked = false,
    className,
    onChange
}: Properties): JSX.Element => {
    const [state, setState] = useState(checked);

    const handleClick = useCallback(() => {
        setState(!state);
    }, [state]);

    useEffect(() => {
        if(onChange) {
            onChange(state);
        }
    }, [onChange, state]);

    return (
        <label className={clsx(styles.container, className)}>
            <input
                type="checkbox"
                className={styles.switch}
                defaultChecked={checked}
                onClick={handleClick}
            />
            <span className={styles.text}>{label}</span>
        </label>
    );
};

export { Switch };
