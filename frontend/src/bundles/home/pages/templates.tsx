import clsx from 'clsx';

import { Icon, Input } from '~/bundles/common/components/components';
import { IconInput } from '~/bundles/common/components/icon-input/icon-input';
import { IconName, IconSize } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { loadAllTemplates } from '~/bundles/edit-temlate/store/actions';
import {
    HomeTopSection,
    ResumeCard,
    TemplateSection,
} from '~/bundles/home/components/components';

import styles from './styles.module.scss';

const Templates: React.FC = () => {
    const dispatch = useAppDispatch();
    const { templates } = useAppSelector((state) => state.templates);

    useEffect(() => {
        if (templates.length === 0) {
            void dispatch(loadAllTemplates());
        }
    }, [dispatch, templates]);

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
                        />
                    }
                    className={styles.icon_input_wrapper}
                />
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
                                title="My Resume"
                                image={template.image}
                            />
                        );
                    })}
            </TemplateSection>
        </div>
    );
};

export { Templates };
