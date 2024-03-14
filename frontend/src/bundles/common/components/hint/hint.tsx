import clsx from 'clsx';
import { type FC } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { Icon } from '~/bundles/common/components/components';
import { IconName } from '~/bundles/common/enums/enums';
import { type HintRow } from '~/bundles/common/types/types';

import styles from './styles.module.scss';

type Properties = {
    className?: string;
    rows?: HintRow[];
};

const Hint: FC<Properties> = ({ className = '', rows }) => {
    return (
        <div className={clsx(className, styles.hint__container)}>
            <Icon
                name={IconName.QUESTION_CIRCLE}
                className={styles.hint__anchor_container}
            />
            <ReactTooltip
                anchorSelect={`.${styles.hint__anchor_container}`}
                className={styles.hint__popup}
            >
                {rows?.length &&
                    rows.map((row: HintRow) => (
                        <div key={row.text} className={styles.hint__row}>
                            <Icon
                                name={IconName.CHECK_CIRCLE}
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
