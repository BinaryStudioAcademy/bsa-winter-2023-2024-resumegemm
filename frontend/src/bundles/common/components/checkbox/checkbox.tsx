import clsx from 'clsx';

import styles from './styles.module.scss';

type Properties = {
    label: string;
    checked?: boolean;
    className?: string;
};

const Checkbox: React.FC<Properties> = ({
    label,
    checked = false,
    className,
}: Properties): JSX.Element => {
    return (
        <label className={clsx(styles.container, className)}>
            <input
                type="checkbox"
                className={styles.checkbox}
                defaultChecked={checked}
            />
            <span className={styles.text}>{label}</span>
        </label>
    );
};

export { Checkbox };
