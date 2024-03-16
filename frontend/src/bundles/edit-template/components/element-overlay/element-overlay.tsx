import styles from './styles.module.scss';

type Properties = React.HTMLProps<HTMLSpanElement> & {
    onOverlayClick?: () => void;
};

const ElementOverlay: React.FC<Properties> = ({
    onOverlayClick,
    ...properties
}) => {
    return (
        <span
            className={styles.overlay}
            onClick={onOverlayClick}
            aria-hidden="true"
        >
            <span {...properties} className={styles.overlay_button}>
                +
            </span>
        </span>
    );
};

export { ElementOverlay };
