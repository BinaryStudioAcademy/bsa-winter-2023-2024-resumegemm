import clsx from 'clsx';
import React, { type ChangeEvent, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
    Checkbox,
    Header,
    NavTabs,
    RegularButton,
} from '../common/components/components';
import { headerItems } from '../common/components/layout/header/constants/header-items';
import { UserProfile } from '../common/components/layout/header/user-profile/user-profile';
import { ButtonSize, ButtonType, ButtonVariant } from '../common/enums/enums';
import { getUserAvatar } from '../common/helpers/get-user-avatar';
import { useAppDispatch, useAppSelector } from '../common/hooks/hooks';
import editorStyles from '../cv-editor/components/online-editor/online-editor-handler.module.scss';
import styles from '../resume-preview/components/resume-preview/styles.module.scss';
import { TemplateBlockTitles } from '../templates-page/types/types';
import { TemplateEditor } from './components/template-editor/template-editor';
import { editTemplate, getTemplateById } from './store/actions';
import { actions as editTemplateActions } from './store/edit-template.store';
import templateStyles from './styles.module.scss';

const EditTemplatePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const template = useAppSelector((state) => state.editTemplate.template);
    const parameters = useParams<{ id: string }>();

    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!parameters.id) {
            return;
        }

        if (!template.id || template.id !== parameters.id) {
            void dispatch(getTemplateById(parameters.id));
        }
    }, [parameters.id, template.id, dispatch]);

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

    const handleSaveTemplate = useCallback(() => {
        void dispatch(editTemplate());
    }, [dispatch]);

    return (
        <>
            <Header>
                <NavTabs items={headerItems} />
                <UserProfile image={getUserAvatar(user)} />
            </Header>
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
                                className={clsx(
                                    editorStyles.editor_sidebar__item,
                                    styles.editor_sidebar_flex,
                                )}
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
                <TemplateEditor settings={templateSettings} />
            </section>
        </>
    );
};

export { EditTemplatePage };
