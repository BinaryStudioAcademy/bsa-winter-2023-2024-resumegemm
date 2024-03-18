import clsx from 'clsx';
import React, {
    type ChangeEvent,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useParams } from 'react-router-dom';

import {
    Checkbox,
    Dropdown,
    FormGroup,
    IconButton,
    Input,
    Modal,
    RegularButton,
} from '../common/components/components';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    ModalVariant,
} from '../common/enums/enums';
import { useAppDispatch, useAppSelector } from '../common/hooks/hooks';
import editorStyles from '../cv-editor/components/online-editor/online-editor-handler.module.scss';
import styles from '../resume-preview/components/resume-preview/styles.module.scss';
import { TemplateItemTags } from '../templates-page/enums/enums';
import {
    type TemplateSettings,
    TemplateBlockTitles,
} from '../templates-page/types/types';
import { TemplateEditor } from './components/template-editor/template-editor';
import { dropdownOptions } from './constants/constants';
import { EditorStyles } from './enums/editor-styles.enum';
import { FontStyles } from './enums/font-styles';
import {
    changeBlockEnabling,
    isBlockEnabled as isBlockEnabledByName,
} from './helpers/block-enabling.helper';
import { hasHeader } from './helpers/block-header.helper';
import {
    changeBlockItemsStyle,
    changeBlockStyle,
    changeFontStyle,
} from './helpers/block-styles.helper';
import { editTemplate, getTemplateById } from './store/actions';
import { actions as editTemplateActions } from './store/slice';
import templateStyles from './styles.module.scss';

const EditTemplatePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const template = useAppSelector((state) => state.editTemplate.template);
    const parameters = useParams<{ id: string }>();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [fontStyle, setFontStyle] = useState(FontStyles.Regular);
    const [fontSize, setFontSize] = useState('');
    const [fontFamily, setFontFamily] = useState('');
    const [blockName, setBlockName] = useState('');
    const [tagName, setTagName] = useState(TemplateItemTags.HEADING);

    const [templateSettings, setTemplateSettings] = useState<TemplateSettings>({
        containers: [],
        styles: {},
    });

    useEffect(() => {
        if (!parameters.id) {
            return;
        }

        void dispatch(getTemplateById(parameters.id))
            .unwrap()
            .then((data) => {
                if (data) {
                    setTemplateSettings(data.templateSettings);
                }
            });
    }, [dispatch, parameters.id]);

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

    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            const name = event.target.value;
            dispatch(
                editTemplateActions.setName({
                    name,
                }),
            );
        },
        [dispatch],
    );

    const handleSaveTemplate = useCallback(() => {
        void dispatch(editTemplate(templateSettings));
    }, [dispatch, templateSettings]);

    const handleBackgroundStyleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setTemplateSettings((previous) => {
                return changeBlockStyle({
                    blockName: name,
                    value: value,
                    style: EditorStyles.BackgroundColor,
                    templateSettings: previous,
                });
            });
        },
        [],
    );

    const handleHeadingStyleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setTemplateSettings((previous) => {
                return changeBlockItemsStyle({
                    tagName: TemplateItemTags.HEADING,
                    blockName: name,
                    value: value,
                    style: EditorStyles.Color,
                    templateSettings: previous,
                });
            });
        },
        [],
    );

    const handleFontStyleChange = useCallback(() => {
        setTemplateSettings((previous) => {
            return changeFontStyle({
                tagName: tagName,
                blockName,
                templateSettings: previous,
                fontFamily,
                fontSize,
                fontStyle,
            });
        });
    }, [blockName, fontFamily, fontSize, fontStyle, tagName]);

    const handleTextColorChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setTemplateSettings((previous) => {
                return changeBlockItemsStyle({
                    tagName: TemplateItemTags.PARAGRAPH,
                    blockName: name,
                    value: value,
                    style: EditorStyles.Color,
                    templateSettings: previous,
                });
            });
        },
        [],
    );

    const handleFontFamilyChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setFontFamily(event.currentTarget.value);
        },
        [],
    );

    const handleFontSizeChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setFontSize(event.currentTarget.value);
        },
        [],
    );

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const showModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleDropdownChange = useCallback((value: string | undefined) => {
        if (!value) {
            return;
        }

        setFontStyle(value as FontStyles);
    }, []);

    const handleModalSubmit = useCallback(() => {
        setIsModalOpen(false);
        handleFontStyleChange();
    }, [handleFontStyleChange]);

    const handleFontChangeModal = useCallback(
        (blockName: string, tagName: TemplateItemTags) => {
            return function () {
                setBlockName(blockName);
                setTagName(tagName);
                showModal();
            };
        },
        [showModal],
    );

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
                <div className={templateStyles.editor_sidebar__name}>
                    <p>Template Name</p>
                    <Input
                        title="Enter template name"
                        onInput={handleInputChange}
                    />
                </div>

                <ul
                    className={clsx(
                        editorStyles.editor_sidebar__list,
                        templateStyles.editor_sidebar__list,
                    )}
                >
                    {templateBlockTitles.map((block) => (
                        <li
                            key={block}
                            className={clsx(
                                editorStyles.editor_sidebar__item,
                                templateStyles.editor_sidebar__item,
                            )}
                        >
                            <Checkbox
                                className={
                                    templateStyles.editor_sidebar__checkbox
                                }
                                checked={isBlockEnabled(block)}
                                label={block}
                                onChange={handleCheckboxChange}
                                name={block}
                            />
                            <div
                                className={
                                    templateStyles.editor_sidebar__item_customize
                                }
                            >
                                <div
                                    className={
                                        templateStyles.editor_sidebar__customize_list_container
                                    }
                                >
                                    <ul
                                        className={
                                            templateStyles.editor_sidebar__customize_list
                                        }
                                    >
                                        {hasHeader(block, templateSettings) && (
                                            <li
                                                className={
                                                    templateStyles.editor_sidebar__customize_list_item
                                                }
                                            >
                                                Header{' '}
                                                <Input
                                                    name={block}
                                                    onChange={
                                                        handleHeadingStyleChange
                                                    }
                                                    className={
                                                        templateStyles.editor_sidebar__color_picker
                                                    }
                                                    type="color"
                                                />
                                                <IconButton
                                                    className={
                                                        templateStyles.editor_sidebar__color_font_icon
                                                    }
                                                    onClick={handleFontChangeModal(
                                                        block,
                                                        TemplateItemTags.HEADING,
                                                    )}
                                                ></IconButton>
                                            </li>
                                        )}
                                        <li
                                            className={
                                                templateStyles.editor_sidebar__customize_list_item
                                            }
                                        >
                                            Text{' '}
                                            <Input
                                                name={block}
                                                onChange={handleTextColorChange}
                                                className={
                                                    templateStyles.editor_sidebar__color_picker
                                                }
                                                type="color"
                                            />
                                            <IconButton
                                                className={
                                                    templateStyles.editor_sidebar__color_font_icon
                                                }
                                                onClick={handleFontChangeModal(
                                                    block,
                                                    TemplateItemTags.PARAGRAPH,
                                                )}
                                            ></IconButton>
                                        </li>
                                        <li
                                            className={
                                                templateStyles.editor_sidebar__customize_list_item
                                            }
                                        >
                                            Background{' '}
                                            <Input
                                                name={block}
                                                onChange={
                                                    handleBackgroundStyleChange
                                                }
                                                className={
                                                    templateStyles.editor_sidebar__color_picker
                                                }
                                                type="color"
                                            />
                                        </li>
                                    </ul>
                                </div>
                            </div>
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
                templateSettings={templateSettings}
                setTemplateSettings={setTemplateSettings}
            />
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                variant={ModalVariant.CONFIRM}
            >
                <div className={templateStyles.editor_sidebar__modal_container}>
                    <Dropdown
                        name="font-style"
                        onChange={handleDropdownChange}
                        options={dropdownOptions}
                        placeholder="font style"
                    />
                    <Input
                        value={fontFamily}
                        onChange={handleFontFamilyChange}
                        placeholder="font family"
                    ></Input>
                    <Input
                        value={fontSize}
                        onChange={handleFontSizeChange}
                        placeholder="font size"
                    ></Input>
                    <RegularButton onClick={handleModalSubmit}>
                        Confirm
                    </RegularButton>
                </div>
            </Modal>
        </section>
    );
};

export { EditTemplatePage };
