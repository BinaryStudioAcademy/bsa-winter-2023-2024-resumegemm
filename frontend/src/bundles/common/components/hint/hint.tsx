import clsx from 'clsx';
import { type FC } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import checkMark from '~/assets/img/check.svg';
import questionMark from '~/assets/img/question-circle.svg';
import { type HintRow } from '~/bundles/common/types/types';

import styles from './styles.module.scss';

type Properties = {
    className?: string;
    icon?: string | undefined;
    rows?: HintRow[];
};

const Hint: FC<Properties> = ({ className = '', icon, rows }) => {
    return (
        <div className={clsx(className, styles.hint__container)}>
            <img
                alt="hint"
                src={icon ?? questionMark}
                className={styles.hint__anchor_container}
            />
            <ReactTooltip
                anchorSelect={`.${styles.hint__anchor_container}`}
                className={styles.hint__popup}
            >
                {rows?.length &&
                    rows.map((row: HintRow) => (
                        <div key={row.text} className={styles.hint__row}>
                            <img
                                alt="hint_row"
                                src={row.icon ?? checkMark}
                                className={styles.hint__row_icon}
                            />
                            <span className={styles.hint__row_text}>
                                {row.text}
                            </span>
                        </div>
                    ))}
            </ReactTooltip>
        </div>
    );
};

export { Hint };
