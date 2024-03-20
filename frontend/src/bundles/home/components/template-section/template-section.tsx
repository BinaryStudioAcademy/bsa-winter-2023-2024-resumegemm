import clsx from 'clsx';
import { type SortDirection } from 'shared/build/index.js';
import { SearchParameters } from 'shared/build/index.js';

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
    const handleTemplateSearch = useSearch(SearchParameters.TEMPLATE_NAME);

    return (
        <PanelContainer
            onSort={onSort}
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
