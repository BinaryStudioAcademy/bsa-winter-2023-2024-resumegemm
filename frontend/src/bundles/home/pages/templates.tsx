import clsx from 'clsx';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { SearchParameters } from 'shared/build/index.js';

import {
    Icon,
    Input,
    RegularButton,
} from '~/bundles/common/components/components';
import { IconInput } from '~/bundles/common/components/icon-input/icon-input';
import { AppRoute, IconName, IconSize } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useCallback,
    useSearch,
} from '~/bundles/common/hooks/hooks';
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
    const [searchParameters] = useSearchParams();

    const templateName =
        searchParameters.get(SearchParameters.TEMPLATE_NAME) ?? '';

    const { templates } = useLoadTemplates({ name: templateName });
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

    const handleTemplateSearch = useSearch(SearchParameters.TEMPLATE_NAME);

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
                            onChange={handleTemplateSearch}
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
                {templates.length > 0 ? (
                    templates.map((template) => {
                        return (
                            <Link
                                to={`${AppRoute.TEMPLATE}/${template.id}`}
                                key={template.id}
                            >
                                <ResumeCard
                                    title={template.name}
                                    image={template.image}
                                />
                            </Link>
                        );
                    })
                ) : (
                    <p className={styles.template_not_found_message}>
                        No results found for your search
                    </p>
                )}
            </TemplateSection>
        </div>
    );
};

export { Templates };
