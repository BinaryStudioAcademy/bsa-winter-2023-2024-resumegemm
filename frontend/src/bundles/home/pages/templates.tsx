import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import {
    Icon,
    Input,
    RegularButton,
} from '~/bundles/common/components/components';
import { IconInput } from '~/bundles/common/components/icon-input/icon-input';
import { AppRoute, IconName, IconSize } from '~/bundles/common/enums/enums';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks';
import { useLoadTemplates } from '~/bundles/common/hooks/use-load-templates/use-load-templates.hook';
import { createTemplate } from '~/bundles/edit-template/store/actions';
import {
    HomeTopSection,
    ResumeCard,
    TemplateSection,
} from '~/bundles/home/components/components';
import { TemplateErrorMessage } from '~/bundles/templates-page/enums/enums';
import { type TemplateDto } from '~/bundles/templates-page/types/types';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum';
import { showToast } from '~/bundles/toast/helpers/show-toast';

import styles from './styles.module.scss';

const Templates: React.FC = () => {
    const { templates } = useLoadTemplates();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleCreateTemplate = useCallback(() => {
        dispatch(createTemplate())
            .unwrap()
            .then((newTemplate: TemplateDto) => {
                navigate(`${AppRoute.TEMPLATE_EDITOR}/${newTemplate.id}`);
            })
            .catch(() => {
                showToast(
                    TemplateErrorMessage.TEMPLATE_NOT_CREATED,
                    ToastType.ERROR,
                );
            });
    }, [dispatch, navigate]);

    return (
        <div className={clsx(styles.layout, styles.templates_layout)}>
            <HomeTopSection className={styles.flex_home_wrapper}>
                <IconInput
                    prependedIcon={
                        <Icon name={IconName.SEARCH} size={IconSize.MEDIUM} />
                    }
                    input={
                        <Input
                            width="100%"
                            className={styles.template_icon_input}
                            placeholder="Search"
                        />
                    }
                    className={styles.icon_input_wrapper}
                />
                <RegularButton
                    onClick={handleCreateTemplate}
                    className={styles.create_resume_button}
                >
                    Create template
                </RegularButton>
            </HomeTopSection>
            <TemplateSection
                name="Templates"
                hasIconInput={false}
                cardLayout={styles.template_page__card_layout}
            >
                {templates.length > 0 &&
                    templates.map((template) => {
                        return (
                            <ResumeCard
                                key={template.id}
                                title={template.name}
                                image={template.image}
                            />
                        );
                    })}
            </TemplateSection>
        </div>
    );
};

export { Templates };
