import clsx from 'clsx';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import styles from './styles.module.scss';

type Properties = {
    className?: string,
    children: React.ReactNode
};

const Tooltip: React.FC<Properties> = ({
    className = '',
    children
}) => {
    return <div className={clsx(className, styles.tooltip__container)}>
        <div className={styles.tooltip__image_container}></div>
        <ReactTooltip anchorSelect={`.${styles.tooltip__image_container}`} className={styles.tooltip__popup} >
            {children}
        </ReactTooltip>
    </div>;
};

export { Tooltip };
