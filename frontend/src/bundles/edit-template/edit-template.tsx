import clsx from 'clsx';
import React, {
    type ChangeEvent,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useParams } from 'react-router-dom';

import { Checkbox, RegularButton } from '../common/components/components';
import { ButtonSize, ButtonType, ButtonVariant } from '../common/enums/enums';
import { useAppDispatch, useAppSelector } from '../common/hooks/hooks';
import editorStyles from '../cv-editor/components/online-editor/online-editor-handler.module.scss';
import styles from '../resume-preview/components/resume-preview/styles.module.scss';
import { type TemplateSettings } from '../templates-page/types/types';
import { TemplateBlockTitles } from '../templates-page/types/types';
import { TemplateEditor } from './components/template-editor/template-editor';
import {
    changeBlockEnabling,
    isBlockEnabled as isBlockEnabledByName,
} from './helpers/block-enabling.helper';
import { editTemplate, getTemplateById } from './store/actions';
import templateStyles from './styles.module.scss';

const EditTemplatePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const template = useAppSelector((state) => state.editTemplate.template);
    const parameters = useParams<{ id: string }>();

    const [templateSettings, setTemplateSettings] = useState<TemplateSettings>({
        containers: [],
        styles: {},
    });

    useEffect(() => {
        if (!parameters.id) {
            return;
        }

        if (!template.id || template.id !== parameters.id) {
            void dispatch(getTemplateById(parameters.id))
                .unwrap()
                .then((data) => {
                    if (data) {
                        setTemplateSettings(data.templateSettings);
                    }
                });
        }
    }, [parameters.id, template.id, dispatch]);

    const isBlockEnabled = useCallback(
        (blockName: string): boolean =>
            isBlockEnabledByName(blockName, templateSettings),
        [templateSettings],
    );
    const templateBlockTitles = Object.keys(TemplateBlockTitles);

    const handleCheckboxChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            const { name, checked } = event.target;
            setTemplateSettings((previous) => {
                return changeBlockEnabling(name, checked, previous);
            });
        },
        [],
    );

    const handleSaveTemplate = useCallback(() => {
        void dispatch(editTemplate(templateSettings));
    }, [dispatch, templateSettings]);

    return (
        <section
            className={clsx(
                editorStyles.editor__section,
                templateStyles.edit__section_wrapper,
            )}
        >
            <nav
                className={clsx(
                    editorStyles.editor_sidebar__nav,
                    templateStyles.editor_sidebar__nav,
                )}
            >
                <ul className={editorStyles.editor_sidebar__list}>
                    {templateBlockTitles.map((block) => (
                        <li
                            key={block}
                            style={{ 'display': 'flex' }}
                            className={editorStyles.editor_sidebar__item}
                        >
                            <Checkbox
                                checked={isBlockEnabled(block)}
                                label=""
                                onChange={handleCheckboxChange}
                                name={block}
                            />
                            {block}
                        </li>
                    ))}
                </ul>
                <div className={styles.editor_output__block}>
                    <RegularButton
                        type={ButtonType.SUBMIT}
                        size={ButtonSize.MEDIUM}
                        variant={ButtonVariant.DEFAULT}
                        onClick={handleSaveTemplate}
                        className={clsx(templateStyles.output__button)}
                    >
                        Save Tempalte
                    </RegularButton>
                </div>
            </nav>
            <TemplateEditor
                templateSettings={templateSettings}
                setTemplateSettings={setTemplateSettings}
            />
        </section>
    );
};

export { EditTemplatePage };
