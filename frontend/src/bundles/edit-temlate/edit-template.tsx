import clsx from 'clsx';
import React, { type ChangeEvent, useCallback, useState } from 'react';

import data from '~/bundles/resume-preview/data/resume-preview.json';

import { BaseButton, Checkbox } from '../common/components/components';
import { ButtonSize, ButtonType, ButtonVariant } from '../common/enums/enums';
import editorStyles from '../cv-editor/components/online-editor/online-editor-handler.module.scss';
import {
    Contacts,
    Education,
    Experience,
    Languages,
    Portfolio,
    Profile,
    Recommendations,
    Skills,
    Socials,
    Summary,
    TechStack,
} from '../resume-preview/components/components';
import styles from '../resume-preview/components/resume-preview/styles.module.scss';
import templateStyles from './styles.module.scss';
import { templateApi } from './templates';

type SelectedBlocks = Record<string, boolean>;

const EditTemplatePage: React.FC = () => {
    const initialBlocksState: SelectedBlocks = {
        'Profile': true,
        'Contacts': true,
        'Summary': true,
        'Experience': true,
        'Recommendations': true,
        'Skills': true,
        'TechStack': true,
        'Portfolio': true,
        'Languages': true,
        'Education': true,
        'Socials': true,
    };

    const blocks = Object.keys(initialBlocksState);

    const [selectedBlocks, setSelectedBlocks] =
        useState<SelectedBlocks>(initialBlocksState);

    const handleCheckboxChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            setSelectedBlocks({
                ...selectedBlocks,
                [event.target.name]: event.target.checked,
            });
        },
        [selectedBlocks],
    );

    const handleSaveTemplate = useCallback(() => {
        // try {
        //     await templateApi.updateTemplate('12345', selectedBlocks);
        // } catch (error) {
        //     throw typeof error === 'string' ? new Error(error) : new TypeError('Expected a string');
        // }
    }, []);

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
            </nav>
            <div className={styles.editor_output__block}>
                <BaseButton
                    type={ButtonType.SUBMIT}
                    size={ButtonSize.MEDIUM}
                    variant={ButtonVariant.DEFAULT}
                    onClick={handleSaveTemplate}
                    className={editorStyles.editor_output__button}
                >
                    Save Tempalte
                </BaseButton>
            </div>

            <div>
                <div className={styles.resume_preview__wrapper}>
                    {selectedBlocks['Profile'] && <Profile />}
                    {selectedBlocks['Contacts'] && <Contacts />}
                    <div className={styles.resume_preview__content}>
                        <div
                            className={
                                styles.resume_preview__content_main_section
                            }
                        >
                            {selectedBlocks['Summary'] && (
                                <Summary
                                    data={data.summary}
                                    json_styles={data.summary.styles}
                                />
                            )}
                            {selectedBlocks['Experience'] && <Experience />}
                            {selectedBlocks['Recommendations'] && (
                                <Recommendations />
                            )}
                        </div>
                        <div
                            className={
                                styles.resume_preview__content_aside_section
                            }
                        >
                            {selectedBlocks['Design'] && (
                                <Skills
                                    data={data.skills}
                                    json_styles={data.skills.styles}
                                />
                            )}
                            {selectedBlocks['TechStack'] && (
                                <TechStack
                                    data={data.tech_stack}
                                    json_styles={data.tech_stack.styles}
                                />
                            )}
                            {selectedBlocks['Portfolio'] && (
                                <Portfolio
                                    data={data.portfolio.data}
                                    json_styles={data.portfolio.styles}
                                />
                            )}
                            {selectedBlocks['Languages'] && (
                                <Languages
                                    data={data.languages}
                                    json_styles={data.languages.styles}
                                />
                            )}
                            {selectedBlocks['Education'] && (
                                <Education
                                    data={data.education.data}
                                    json_styles={data.education.styles}
                                />
                            )}
                            {selectedBlocks['Socials'] && (
                                <Socials
                                    data={data.social_links}
                                    json_styles={data.social_links.styles}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { EditTemplatePage };
