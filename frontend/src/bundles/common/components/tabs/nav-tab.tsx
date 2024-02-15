import { clsx } from 'clsx';
import React, { useCallback, useState } from 'react';

import { type AppRoute } from '../../enums/app-route.enum';
import { type ValueOf } from '../../types/types';
import { Button, Link } from '../components';
import styles from './style.module.scss';

type NavbarItem = {
    label: string;
    path: ValueOf<typeof AppRoute>;
};

type Properties = {
    items: NavbarItem[];
};

const NavTabs: React.FC<Properties> = ({ items }) => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleTabClick = useCallback((index: number) => {
        setActiveTab(index);
    }, [setActiveTab]);

    const onTabClick = (index: number) => () => {
        handleTabClick(index);
    };

    return (
        <nav>
            <div className={styles.tab__header}>
                {items.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                    >
                        <Button
                            onClick={onTabClick(index)}
                            className={clsx(styles.tab__item, { [styles.active]: index === activeTab })}>
                                {item.label}
                        </Button>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export { NavTabs };
