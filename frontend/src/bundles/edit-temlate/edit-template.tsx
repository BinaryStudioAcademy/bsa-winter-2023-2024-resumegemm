import clsx from 'clsx';
import React, { type ChangeEvent, useCallback, useState } from 'react';

import { BaseButton, Checkbox } from '../common/components/components';
import { ButtonSize, ButtonType, ButtonVariant } from '../common/enums/enums';
import { useAppDispatch, useAppSelector } from '../common/hooks/hooks';
import editorStyles from '../cv-editor/components/online-editor/online-editor-handler.module.scss';
import styles from '../resume-preview/components/resume-preview/styles.module.scss';
import { EditableTemplate } from './components/editable-templte';
import { transformTemplateSettings } from './helpers/get-initial-template-state.helper';
import { actions as templateActions } from './store';
import templateStyles from './styles.module.scss';
import { type TemplateDto } from './types/types';

type SelectedBlocks = Record<string, boolean>;

const EditTemplatePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const templates = useAppSelector((state) => state.templates.templates);
    const currentTemplate = templates.find((template) => template.id === '1');

    const initialBlockSettings = transformTemplateSettings(
        currentTemplate?.templateSettings ?? {},
    );

    const [selectedBlocks, setSelectedBlocks] =
        useState<SelectedBlocks>(initialBlockSettings);

    const blocks = Object.keys(initialBlockSettings);

    const handleCheckboxChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            setSelectedBlocks((previousBlocks) => ({
                ...previousBlocks,
                [event.target.name]: event.target.checked,
            }));
        },
        [],
    );

    const handleSaveTemplate = useCallback(() => {
        async (): Promise<void> => {
            try {
                const editedTemplate: TemplateDto = {
                    id: '1',
                    isOwner: true,
                    createdAt: '2021-08-25T14:00:00.000Z',
                    updatedAt: '2021-08-25T14:00:00.000Z',
                    deletedAt: null,
                    templateSettings: selectedBlocks,
                };
                await dispatch(templateActions.editTemplate(editedTemplate));
            } catch (error) {
                throw typeof error === 'string'
                    ? new Error(error)
                    : new TypeError('Expected a string');
            }
        };
    }, [dispatch, selectedBlocks]);

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
                    {blocks.map((block) => (
                        <li
                            key={block}
                            style={{ 'display': 'flex' }}
                            className={editorStyles.editor_sidebar__item}
                        >
                            <Checkbox
                                checked={selectedBlocks[block]}
                                label=""
                                onChange={handleCheckboxChange}
                                name={block}
                            />
                            {block}
                        </li>
                    ))}
                </ul>
                <div className={styles.editor_output__block}>
                    <BaseButton
                        type={ButtonType.SUBMIT}
                        size={ButtonSize.MEDIUM}
                        variant={ButtonVariant.DEFAULT}
                        onClick={handleSaveTemplate}
                        className={clsx(templateStyles.output__button)}
                    >
                        Save Tempalte
                    </BaseButton>
                </div>
            </nav>
            <EditableTemplate selectedBlocks={selectedBlocks} />
        </section>
    );
};

export { EditTemplatePage };
