import clsx from 'clsx';

import { Filter } from '../components';
import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
    name: string;
    classname?: string;
};

const PanelContainer: React.FC<Properties> = ({
    children,
    name,
    classname,
}: Properties) => {
    return (
        <div className={clsx(styles.panel_container, classname)}>
            <div className={styles.panel_container__top_bar}>
                {name}
                <Filter />
            </div>
            <div className={styles.panel_container__content}>{children}</div>
        </div>
    );
};

export { PanelContainer };
