import clsx from 'clsx';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import QuestionIcon from '~/assets/img/question-circle.svg';

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
        <img src={QuestionIcon} alt='tooltip' className={styles.tooltip__image} />
        <ReactTooltip anchorSelect={`.${styles.tooltip__image}`} className={clsx(styles.tooltip__popup)} >
            <p className={styles.tooltip__text}>{text}</p>
        </ReactTooltip>
    </div>;
};

export { Tooltip };
