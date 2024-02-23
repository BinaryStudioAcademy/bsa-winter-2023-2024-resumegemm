import clsx from 'clsx';

import { Filter } from '../components';
import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
    name: string;
    classname?: string;
    onFilterOptionSelect: (option: number) => void;
};

const PanelContainer: React.FC<Properties> = ({
    children,
    name,
    classname,
    onFilterOptionSelect,
}: Properties) => {
    return (
        <div className={clsx(styles.panel_container, classname)}>
            <div className={styles.panel_container__top_bar}>
                {name}
                <Filter onOptionSelect={onFilterOptionSelect} />
            </div>
            <div className={styles.panel_container__content}>{children}</div>
        </div>
    );
};

export { PanelContainer };
