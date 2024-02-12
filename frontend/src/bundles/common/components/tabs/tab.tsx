import React, { type KeyboardEvent, type ReactNode,useCallback, useState } from 'react';

import styles from './style.module.css';

type TabProperties = {
    children: ReactNode;
};

const Tab: React.FC<TabProperties> = ({ children }) => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleTabClick = useCallback((index: number) => {
        setActiveTab(index);
    }, [setActiveTab]);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number): void => {
        if (event.key === 'Enter' || event.key === 'Space') {
            handleTabClick(index);
        }
    };

    const onTabClick = (index: number) => () => {
        handleTabClick(index);
    };

    const onKeyDown = (index: number) => (event: React.KeyboardEvent<HTMLDivElement>) => {
        handleKeyDown(event, index);
    };

    return (
        <div>
            <div className={styles.tab__header}>
                {React.Children.map(children, (child, index) => (
                    <div
                        key={index}
                        tabIndex={0}
                        role="button"
                        className={`${styles.tab__item} ${index === activeTab ? styles.active : ''}`}
                        onClick={onTabClick(index)}
                        onKeyDown={onKeyDown(index)}
                    >
                        {React.isValidElement(child) &&
                            (child as React.ReactElement).props.title}
                    </div>
                ))}
            </div>
            <div className={styles.tab__content}>
                {React.Children.toArray(children)[activeTab]}
            </div>
        </div>
    );
};

export { Tab };
