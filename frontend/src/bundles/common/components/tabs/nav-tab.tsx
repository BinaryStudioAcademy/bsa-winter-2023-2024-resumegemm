import { clsx } from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { type AppRoute } from '../../enums/app-route.enum';
import { type ValueOf } from '../../types/types';
import styles from './style.module.scss';

type NavbarItem = {
    label: string;
    path: ValueOf<typeof AppRoute>;
};

type Properties = {
    items: NavbarItem[];
};

const getNavLinkClassName = ({ isActive }: { isActive: boolean }): string =>
    clsx(styles.tab__item, isActive && styles.active);

const NavTabs: React.FC<Properties> = ({ items }) => {
    return (
        <nav>
            <div className={styles.tab__header}>
                {items.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={getNavLinkClassName}
                    >
                        {item.label}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export { NavTabs };
