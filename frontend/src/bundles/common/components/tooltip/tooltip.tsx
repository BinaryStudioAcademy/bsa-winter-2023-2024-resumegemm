import clsx from 'clsx';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { TooltipDimensions } from '../../enums/enums';
import { type ValueOf } from '../../types/types';
import styles from './styles.module.scss';

type Properties = {
    className?: string,
    children?: React.ReactNode,
    text: string,
    dimensionType?: ValueOf<typeof TooltipDimensions>
};

const DimensionTypes: Record<TooltipDimensions, string> = {
    expand100Percent: styles.tooltip__container_100_percent,
    fitContent: styles.tooltip__container_fit_content
};

const Tooltip: React.FC<Properties> = ({
    className = '',
    children,
    text,
    dimensionType = TooltipDimensions.fitContent
}) => {
    return <div className={clsx(className, styles.tooltip__container, DimensionTypes[dimensionType])}>
        <div className={styles.tooltip__anchor_container}>
            {children}
        </div>
        <ReactTooltip anchorSelect={`.${styles.tooltip__anchor_container}`} className={styles.tooltip__popup} >
            {text}
        </ReactTooltip>
    </div>;
};

export { Tooltip };
