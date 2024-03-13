import clsx from 'clsx';
import React, { type ChangeEvent, useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Checkbox, RegularButton } from '../common/components/components';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    ContentType,
} from '../common/enums/enums';
import { useAppDispatch, useAppSelector } from '../common/hooks/hooks';
import { useTakeScreenShot } from '../common/hooks/use-take-screenshot/use-take-screenshot.hook';
import editorStyles from '../cv-editor/components/online-editor/online-editor-handler.module.scss';
import styles from '../resume-preview/components/resume-preview/styles.module.scss';
import { TemplateBlockTitles } from '../templates-page/types/types';
import { ToastType } from '../toast/enums/show-toast-types.enum';
import { showToast } from '../toast/helpers/show-toast';
import { TemplateEditor } from './components/template-editor/template-editor';
import { editTemplate, getTemplateById } from './store/actions';
import { actions as editTemplateActions } from './store/edit-template.store';
import templateStyles from './styles.module.scss';

const EditTemplatePage: React.FC = () => {
    const { takeScreenshot } = useTakeScreenShot();

    const dispatch = useAppDispatch();
    const template = useAppSelector((state) => state.editTemplate.template);
    const parameters = useParams<{ id: string }>();
    const templateEditorReference = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!parameters.id) {
            return;
        }

        if (!template.id || template.id !== parameters.id) {
            void dispatch(getTemplateById(parameters.id));
        }
    }, [parameters.id, template.id, dispatch, takeScreenshot]);

    const templateSettings = useAppSelector(
        (state) => state.editTemplate.template.templateSettings,
    );

    const isBlockEnabled = useCallback(
        (blockName: string): boolean => {
            return templateSettings.containers.some((container) =>
                container.blocks.some(
                    (block) => block.name === blockName && block.enabled,
                ),
            );
        },
        [templateSettings.containers],
    );
    const templateBlockTitles = Object.keys(TemplateBlockTitles);

    const handleCheckboxChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            const { name, checked } = event.target;
            dispatch(
                editTemplateActions.setBlockEnabled({
                    blockName: name,
                    enabled: checked,
                }),
            );
        },
        [dispatch],
    );

    const handleSaveTemplate = useCallback((): void => {
        takeScreenshot({
            ref: templateEditorReference,
            convertOptions: { quality: 1, type: ContentType.IMAGE_JPEG },
        })
            .then((screenshot) => {
                if (screenshot) {
                    void dispatch(editTemplate(screenshot));
                }
            })
            .catch((error) => showToast(error, ToastType.ERROR));
    }, [dispatch, takeScreenshot]);

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
                        Save Template
                    </RegularButton>
                </div>
            </nav>
            <TemplateEditor
                ref={templateEditorReference}
                settings={templateSettings}
            />
        </section>
    );
};

export { EditTemplatePage };
