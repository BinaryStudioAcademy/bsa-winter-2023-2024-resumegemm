import clsx from 'clsx';
import React, { useCallback, useState } from 'react';

import { BaseButton } from '~/bundles/common/components/components';
import { ButtonSize, ButtonType, ButtonVariant } from '~/bundles/common/enums/enums';

import { type TabsProps as TabsProperties } from '../../types/interface';
import styles from './online-editor-handler.module.scss';

const OnlineEditorTabsHandler: React.FC<TabsProperties> = ({ tabs }) => {
    const [activeTabIndex , setActiveTabIndex ] = useState(0);
  
    const handleTabClick = (tabIndex: number) => (event_: React.MouseEvent) => {
        event_.preventDefault();
        setActiveTabIndex (tabIndex);
    };

    const onNextClick = useCallback(() => {
        setActiveTabIndex((previousTabIndex) => (previousTabIndex + 1) % tabs.length);
    }, [setActiveTabIndex , tabs]);

    return (
        <section className={styles.editor__section}>
            <nav className={styles.editor_sidebar__nav} >
                <ul className={styles.editor_sidebar__list}>
                    {tabs.map((tab, index) => (
                        <li key={tab.label}>
                            <button className={clsx(styles.editor_sidebar__item, { [styles.editor_sidebar__item__active]: activeTabIndex  === index })}
                                onClick={handleTabClick(index)}
                            >
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={styles.editor_output__block}>
                <div>{tabs[activeTabIndex ].content}</div>
                    <BaseButton type={ButtonType.SUBMIT} size={ButtonSize.MEDIUM} variant={ButtonVariant.DEFAULT} onClick={onNextClick} className={styles.editor_output__button}>
                        Next
                    </BaseButton>
                </div>
        </section>
    );
  };
  
  export { OnlineEditorTabsHandler };