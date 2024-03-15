import { type ChangeEvent } from 'react';

import {
    FormGroup,
    Input,
    RegularButton,
} from '~/bundles/common/components/components';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
} from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useCallback,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks';
import { EditorTabs } from '~/bundles/cv-editor/components/editor-tabs/editor-tabs';
import { updateSettingsBlocksFromInputs } from '~/bundles/resume/helpers/helpers';
import { actions as resumeActions } from '~/bundles/resume/store/resume.store';
import { type TemplateSettings } from '~/bundles/resume/types/types';

import styles from './online-editor-handler.module.scss';

type TabsPayload = {
    tabs: TemplateSettings['containers'];
    isCreate?: boolean;
};

const OnlineEditorTabsHandler: React.FC<TabsPayload> = ({ tabs, isCreate }) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const dispatch = useAppDispatch();
    const [
        { blocks: firstBlocks },
        { blocks: secondBlock },
        { blocks: thirdBlock },
    ] = tabs;

    const mergedTemplateSettingsProperties = useMemo(
        () => [...firstBlocks, ...secondBlock, ...thirdBlock],
        [firstBlocks, secondBlock, thirdBlock],
    );

    const templateSettingsContainerItems =
        mergedTemplateSettingsProperties[activeTabIndex].items;

    const onNextClick = useCallback(() => {
        setActiveTabIndex(
            (previousTabIndex) =>
                (previousTabIndex + 1) %
                mergedTemplateSettingsProperties.length,
        );
    }, [setActiveTabIndex, mergedTemplateSettingsProperties]);

    const handleInputResumeFieldChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { name, value, id } = event.target;
            const updatedTemplateSettingsBlocks =
                updateSettingsBlocksFromInputs(tabs, name, value);

            void dispatch(
                resumeActions.setNewTemplateSettings(
                    updatedTemplateSettingsBlocks,
                ),
            );
            if (isCreate) {
                return;
            }
            void dispatch(
                resumeActions.updateCurrentResume({ itemId: id, value }),
            );
        },
        [dispatch, tabs, isCreate],
    );

    return (
        <section className={styles.editor__section}>
            <nav className={styles.editor_sidebar__nav}>
                <ul className={styles.editor_sidebar__list}>
                    {mergedTemplateSettingsProperties.map((tab, index) => (
                        <EditorTabs
                            key={tab.id}
                            tabName={tab.name}
                            index={index}
                            activeTabIndex={activeTabIndex}
                            setActiveTabIndex={setActiveTabIndex}
                        />
                    ))}
                </ul>
            </nav>
            <div className={styles.editor_output__block}>
                <div>
                    {templateSettingsContainerItems.map((item) => (
                        <FormGroup key={item.id} label={item.name}>
                            <Input
                                id={item.id}
                                type="text"
                                name={item.name}
                                value={item.content}
                                onChange={handleInputResumeFieldChange}
                            />
                        </FormGroup>
                    ))}
                </div>
                <RegularButton
                    type={ButtonType.SUBMIT}
                    size={ButtonSize.MEDIUM}
                    variant={ButtonVariant.DEFAULT}
                    onClick={onNextClick}
                    className={styles.editor_output__button}
                >
                    Next
                </RegularButton>
            </div>
        </section>
    );
};

export { OnlineEditorTabsHandler };
