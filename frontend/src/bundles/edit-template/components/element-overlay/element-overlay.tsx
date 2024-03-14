import styles from './styles.module.scss';

type Properties = React.HTMLProps<HTMLSpanElement>;

const ElementOverlay: React.FC<Properties> = ({ ...properties }) => {
    return (
        <span className={styles.overlay}>
            <span {...properties} className={styles.overlay_button}>
                +
            </span>
        </span>
    );
};

export { ElementOverlay };
