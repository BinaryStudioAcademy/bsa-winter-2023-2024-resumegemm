import clsx from 'clsx';

import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
    className?: string;
};

const HomeTopSection: React.FC<Properties> = ({
    children,
    className = '',
}: Properties) => {
    return (
        <div className={clsx(styles.home_top_section, className)}>
            {children}
        </div>
    );
};

export { HomeTopSection };
