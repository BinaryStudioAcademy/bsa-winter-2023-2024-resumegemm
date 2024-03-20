import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';
import { type SortDirection, SearchParameters } from 'shared/build/index.js';

import { useSearch } from '~/bundles/common/hooks/hooks';

import { PanelContainer } from '../components';
import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
    name: string;
    hasIconInput?: boolean;
    cardLayout?: string;
    onSort: (sortMethod: SortDirection) => void;
};

const TemplateSection: React.FC<Properties> = ({
    children,
    name,
    hasIconInput = true,
    cardLayout,
    onSort,
}: Properties) => {
    const [searchParameters] = useSearchParams();

    const handleTemplateSearch = useSearch(SearchParameters.TEMPLATE_NAME);

    const templateName =
        searchParameters.get(SearchParameters.TEMPLATE_NAME) ?? '';

    return (
        <PanelContainer
            onSort={onSort}
            hasIconInput={hasIconInput}
            name={name}
            className={styles.template_section}
            onHandleSearch={handleTemplateSearch}
            defaultSearchValue={templateName}
        >
            <div className={clsx(styles.template_section__cards, cardLayout)}>
                {children}
            </div>
        </PanelContainer>
    );
};

export { TemplateSection };
