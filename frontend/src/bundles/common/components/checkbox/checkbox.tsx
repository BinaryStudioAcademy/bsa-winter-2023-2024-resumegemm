import clsx from 'clsx';

import styles from './styles.module.scss';

type Properties = {
    label: string;
    checked?: boolean;
    className?: string;
    name: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox: React.FC<Properties> = ({
    label,
    checked = false,
    className,
    onChange,
    name,
}: Properties): JSX.Element => {
    return (
        <label className={clsx(styles.container, className)}>
            <div className={styles.checkmark_container}>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    defaultChecked={checked}
                    onChange={onChange}
                    name={name}
                    id={name}
                />
                <svg
                    className={styles.checkmark}
                    width="100%"
                    height="100%"
                    viewBox="0 0 10 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 1.18333L8.825 0L3.33333 5.49167L1.18333 3.35L0 4.525L3.33333 7.85L10 1.18333Z"
                        fill="currentColor"
                    />
                </svg>
            </div>
            <span className={styles.text}>{label}</span>
        </label>
    );
};

export { Checkbox };
