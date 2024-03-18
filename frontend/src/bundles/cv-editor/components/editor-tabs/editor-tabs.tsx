import clsx from 'clsx';

import { BaseButton } from '~/bundles/common/components/components';
import { useCallback } from '~/bundles/common/hooks/hooks';
import styles from '~/bundles/cv-editor/components/online-editor/online-editor-handler.module.scss';

type EditorTabsPayload = {
    index: number;
    setActiveTabIndex: (index: number) => void;
    tabName: string;
    activeTabIndex: number;
};

const EditorTabs: React.FC<EditorTabsPayload> = ({
    index,
    setActiveTabIndex,
    tabName,
    activeTabIndex,
}) => {
    const onTabClick = useCallback(() => {
        setActiveTabIndex(index);
    }, [index, setActiveTabIndex]);
    return (
        <li>
            <BaseButton
                className={clsx(styles.editor_sidebar__item, {
                    [styles.editor_sidebar__item__active]:
                        activeTabIndex === index,
                })}
                onClick={onTabClick}
            >
                {tabName}
            </BaseButton>
        </li>
    );
};

export { EditorTabs };
