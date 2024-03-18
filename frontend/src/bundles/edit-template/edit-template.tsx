import clsx from 'clsx';
import React, {
    type ChangeEvent,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
    Checkbox,
    Icon,
    Input,
    RegularButton,
} from '../common/components/components';
import {
    AppRoute,
    ButtonSize,
    ButtonType,
    ButtonVariant,
    IconName,
} from '../common/enums/enums';
import { useAppDispatch, useAppSelector } from '../common/hooks/hooks';
import editorStyles from '../cv-editor/components/online-editor/online-editor-handler.module.scss';
import {
    type TemplateSettings,
    TemplateBlockTitles,
} from '../templates-page/types/types';
import { ToastType } from '../toast/enums/show-toast-types.enum';
import { showToast } from '../toast/helpers/show-toast';
import { TemplateEditor } from './components/template-editor/template-editor';
import {
    changeBlockEnabling,
    isBlockEnabled as isBlockEnabledByName,
} from './helpers/block-enabling.helper';
import { editTemplate, getTemplateById } from './store/actions';
import { actions as editTemplateActions } from './store/slice';
import templateStyles from './styles.module.scss';

const EditTemplatePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const template = useAppSelector((state) => state.editTemplate.template);
    const navigate = useNavigate();
    const parameters = useParams<{ id: string }>();

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
        void dispatch(editTemplate(templateSettings))
            .unwrap()
            .then((data) => {
                if (data) {
                    showToast('Changes saved.', ToastType.SUCCESS);
                }
            });
    }, [dispatch, templateSettings]);

    const handleReturn = useCallback(() => {
        navigate(AppRoute.TEMPLATES);
    }, [navigate]);

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
                        value={template.name}
                    />
                </div>
                <ul className={editorStyles.editor_sidebar__list}>
                    {templateBlockTitles.map((block) => (
                        <li
                            key={block}
                            style={{ 'display': 'flex' }}
                            className={editorStyles.editor_sidebar__item}
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
                        </li>
                    ))}
                </ul>
                <div className={templateStyles.output__block}>
                    <RegularButton
                        type={ButtonType.SUBMIT}
                        size={ButtonSize.MEDIUM}
                        variant={ButtonVariant.DEFAULT}
                        onClick={handleSaveTemplate}
                        className={clsx(templateStyles.output__button)}
                    >
                        <Icon name={IconName.SAVE}></Icon>Save Template
                    </RegularButton>
                    <RegularButton
                        type={ButtonType.RESET}
                        size={ButtonSize.MEDIUM}
                        variant={ButtonVariant.DEFAULT}
                        onClick={handleReturn}
                        className={clsx(templateStyles.output__button)}
                    >
                        <Icon name={IconName.ARROW_LEFT}></Icon>Back to
                        Templates
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
