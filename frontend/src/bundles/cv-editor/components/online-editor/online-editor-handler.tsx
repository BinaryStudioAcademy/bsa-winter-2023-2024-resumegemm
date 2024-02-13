import clsx from 'clsx';
import React, { useCallback, useState } from 'react';

import { type TabsProps as TabsProperties } from '../../types/interface';
import css from './online-editor-handler.module.scss';

const OnlineEditorTabsHandler: React.FC<TabsProperties> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);
  
    const handleTabClick = (tabIndex: number) => (event_: React.MouseEvent) => {
        event_.preventDefault();
        setActiveTab(tabIndex);
    };

    const onNextClick = useCallback(() => {
        setActiveTab(activeTab < tabs.length - 1 ? activeTab + 1 : activeTab);
    }, [setActiveTab, activeTab, tabs]);

    return (
        <section className={css.editor__section}>
            <nav className={css.editor_sidebar__nav} >
                <ul className={css.editor_sidebar__list}>
                    {tabs.map((tab, index) => (
                        <li key={tab.id}>
                            <button className={clsx(css.editor_sidebar__item, { [css.editor_sidebar__item__active]: activeTab === index })}
                                onClick={handleTabClick(index)}
                            >
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={css.editor_output__block}>
                <div>{tabs[activeTab].content}</div>
                <button type='button' onClick={onNextClick} className={css.editor_output__button}>Next</button>
            </div>
        </section>
    );
  };
  
  export { OnlineEditorTabsHandler };