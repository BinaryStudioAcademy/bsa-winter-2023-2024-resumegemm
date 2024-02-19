import { clsx } from 'clsx';
import React, { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { type AppRoute } from '../../enums/app-route.enum';
import { type ValueOf } from '../../types/types';
import { BaseButton, Link } from '../components';
import styles from './style.module.scss';

type NavbarItem = {
    label: string;
    path: ValueOf<typeof AppRoute>;
};

type Properties = {
    items: NavbarItem[];
};

const NavTabs: React.FC<Properties> = ({ items }) => {
    const location = useLocation();

    const initialActiveTab = items.findIndex(
        (item) => {
            if (item) {
                const routePath = item.path;
                return (item.path === location.pathname) ||
                    (routePath && routePath === location.pathname.slice(1));
        }
            return false;
        }
    );
    
    const [activeTab, setActiveTab] = useState<number>(
        initialActiveTab === -1 ? 0 : initialActiveTab
    );

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
                        <BaseButton
                            onClick={onTabClick(index)}
                            className={clsx(styles.tab__item, { [styles.active]: index === activeTab })}>
                                {item.label}
                        </BaseButton>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export { NavTabs };
