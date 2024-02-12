import styles from './styles.module.scss';

type Properties = {
    label: string;
    checked?: boolean;
};

const RadioButton: React.FC<Properties> = ({
    label,
    checked = false,
}: Properties): JSX.Element => {
    return (
        <label className={styles.container}>
            <input
                type="radio"
                className={styles.radio}
                defaultChecked={checked}
            />
            <span className={styles.text}>{label}</span>
        </label>
    );
};

export { RadioButton };
