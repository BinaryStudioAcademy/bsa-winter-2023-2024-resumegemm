import styles from './styles.module.scss';

type Properties = {
    label: string;
    checked?: boolean;
};

const Switch: React.FC<Properties> = ({
    label,
    checked = false,
}: Properties): JSX.Element => {
    return (
        <label className={styles.container}>
            <input
                type="checkbox"
                className={styles.switch}
                defaultChecked={checked}
            />
            <span className={styles.text}>{label}</span>
        </label>
    );
};

export { Switch };
