import clsx from 'clsx';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import styles from './styles.module.scss';

type Properties = {
    className?: string,
    text: string
};

const Tooltip: React.FC<Properties> = ({
    className = '',
    text
}) => {
    return <div className={clsx(className, styles.tooltip__container)}>
        <div className={styles.tooltip__image_container}></div>
        <ReactTooltip anchorSelect={`.${styles.tooltip__image_container}`} className={styles.tooltip__popup} >
            <p className={styles.tooltip__text}>{text}</p>
        </ReactTooltip>
    </div>;
};

export { Tooltip };
