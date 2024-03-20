import clsx from 'clsx';
import { SearchParameters } from 'shared/build/index.js';

import { useSearch } from '~/bundles/common/hooks/hooks';

import { PanelContainer } from '../components';
import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
    name: string;
    hasIconInput?: boolean;
    cardLayout?: string;
};

const TemplateSection: React.FC<Properties> = ({
    children,
    name,
    hasIconInput = true,
    cardLayout,
}: Properties) => {
    const handleTemplateSearch = useSearch(SearchParameters.TEMPLATE_NAME);

    return (
        <PanelContainer
            hasIconInput={hasIconInput}
            name={name}
            className={styles.template_section}
            onHandleSearch={handleTemplateSearch}
        >
            <div className={clsx(styles.template_section__cards, cardLayout)}>
                {children}
            </div>
        </PanelContainer>
    );
};

export { TemplateSection };
