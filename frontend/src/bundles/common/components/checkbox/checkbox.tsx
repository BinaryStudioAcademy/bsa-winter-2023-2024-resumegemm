import styles from './styles.module.scss';

type Properties = {
    label: string;
    checked?: boolean;
};

const Checkbox: React.FC<Properties> = ({
    label,
    checked = false,
}: Properties): JSX.Element => {
    return (
        <label className={styles.container}>
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
