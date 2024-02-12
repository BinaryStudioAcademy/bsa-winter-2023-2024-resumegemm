import { useCallback } from 'react';

import styles from './styles.module.scss';

type OptionProperties = {
    onClick: ({ value, label }: { value: string; label: string }) => void;
    value: string;
    label: string;
    disabled?: boolean;
};

const Option: React.FC<OptionProperties> = ({ onClick, value, label }) => {
    const buttonClickHandler = useCallback(() => {
        onClick({ value, label });
    }, [value, label, onClick]);

    return (
        <button
            className={styles.option}
            value={value}
            onClick={buttonClickHandler}
        >
            {label}
        </button>
    );
};

export { Option };
