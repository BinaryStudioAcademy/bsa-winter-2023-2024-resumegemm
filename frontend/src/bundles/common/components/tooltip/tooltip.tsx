import clsx from 'clsx';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import styles from './styles.module.scss';

type Properties = {
    className?: string,
    children: React.ReactNode,
    text: string
};

const Tooltip: React.FC<Properties> = ({
    className = '',
    children,
    text
}) => {
    return <div className={clsx(className, styles.tooltip__container)}>
        <div className={styles.tooltip__anchor_container}>
            {children}
        </div>
        <ReactTooltip anchorSelect={`.${styles.tooltip__anchor_container}`} className={styles.tooltip__popup} >
            {text}
        </ReactTooltip>
    </div>;
};

export { Tooltip };
